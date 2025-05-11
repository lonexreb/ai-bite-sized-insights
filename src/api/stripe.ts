import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

// Define your Stripe product IDs
const STRIPE_PRODUCTS = {
  basic: {
    monthly: 'price_basic_monthly',
    yearly: 'price_basic_yearly',
  },
  pro: {
    monthly: 'price_pro_monthly',
    yearly: 'price_pro_yearly',
  },
  enterprise: {
    monthly: 'price_enterprise_monthly',
    yearly: 'price_enterprise_yearly',
  },
};

// Webhook event handlers
const handleSubscriptionCreated = async (subscription: Stripe.Subscription) => {
  // Update user's subscription status in your database
  console.log('Subscription created:', subscription.id);
};

const handleSubscriptionUpdated = async (subscription: Stripe.Subscription) => {
  // Update user's subscription status in your database
  console.log('Subscription updated:', subscription.id);
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  // Update user's subscription status in your database
  console.log('Subscription deleted:', subscription.id);
};

export async function handleWebhook(req: any, res: any) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send('Webhook signature verification failed');
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}

export async function createCheckoutSession(req: any, res: any) {
  try {
    const { planId, interval, successUrl, cancelUrl, customerId } = req.body;

    // Get the correct price ID based on plan and interval
    const priceId = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS][interval];

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId, // If you have a customer ID
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        planId,
        interval,
      },
      subscription_data: {
        trial_period_days: 14, // Add 14-day trial
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}

export async function createCustomerPortalSession(req: any, res: any) {
  try {
    const { customerId } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/account`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
}

export async function cancelSubscription(req: any, res: any) {
  try {
    const { subscriptionId } = req.body;

    // Cancel the subscription at period end
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.json({ subscription });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}

export async function updateSubscription(req: any, res: any) {
  try {
    const { subscriptionId, newPlanId } = req.body;

    // Get the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Get the new price ID
    const newPriceId = STRIPE_PRODUCTS[newPlanId as keyof typeof STRIPE_PRODUCTS][
      subscription.items.data[0].price.recurring?.interval as 'month' | 'year'
    ];

    // Update the subscription
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });

    res.json({ subscription: updatedSubscription });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
} 
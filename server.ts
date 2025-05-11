import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  createCheckoutSession,
  cancelSubscription,
  updateSubscription,
  handleWebhook,
  createCustomerPortalSession,
} from './src/api/stripe.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Special handling for Stripe webhooks
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Stripe API routes
app.post('/api/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body;
    if (!priceId) {
      return res.status(400).json({ error: 'priceId is required' });
    }
    const session = await createCheckoutSession(priceId);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
app.post('/api/cancel-subscription', cancelSubscription);
app.post('/api/update-subscription', updateSubscription);
app.post('/api/create-portal-session', createCustomerPortalSession);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
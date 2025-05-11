import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';

export default function TestPayment() {
  const [loading, setLoading] = useState(false);

  const handleTestPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: 'basic',
          interval: 'monthly',
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      });

      const { sessionId } = await response.json();
      
      // Load Stripe
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error('Stripe failed to load');

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Test Payment Flow</CardTitle>
          <CardDescription>
            Test the payment integration with Stripe using test cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-2">Test Card Numbers:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Success: 4242 4242 4242 4242</li>
                <li>Decline: 4000 0000 0000 0002</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Use any future expiration date, any 3-digit CVC, and any postal code
              </p>
            </div>
            
            <Button 
              onClick={handleTestPayment} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Test Payment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
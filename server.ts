import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  createCheckoutSession,
  cancelSubscription,
  updateSubscription,
  handleWebhook,
  createCustomerPortalSession,
} from './src/api/stripe';

dotenv.config();

const app = express();

// Special handling for Stripe webhooks
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Regular JSON parsing for other routes
app.use(cors());
app.use(express.json());

// Stripe API routes
app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/api/cancel-subscription', cancelSubscription);
app.post('/api/update-subscription', updateSubscription);
app.post('/api/create-portal-session', createCustomerPortalSession);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
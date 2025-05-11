# AI Bite-Sized Insights - Subscription System

A modern subscription management system built with React, TypeScript, and Stripe integration.

## Features

### 1. Subscription Plans
- Three-tier pricing structure:
  - Basic Plan ($9.99/month)
  - Pro Plan ($19.99/month)
  - Enterprise Plan ($49.99/month)
- 20% discount for yearly subscriptions
- 14-day free trial for all plans
- Clear feature comparison between plans

### 2. User Interface Components
- **SubscriptionPlans**: Displays available plans with pricing and features
- **SubscriptionManagement**: Manages active subscriptions
- **Account Page**: Central hub for subscription and profile management
- **Success/Cancel Pages**: Handles subscription flow outcomes

### 3. Payment Integration
- Secure Stripe Checkout integration
- Support for multiple payment methods
- Automatic handling of subscription renewals
- Trial period management

### 4. Customer Portal
- Self-service subscription management
- Plan upgrades and downgrades
- Payment method updates
- Billing history access
- Subscription cancellation

### 5. Backend Features
- Webhook handling for subscription events
- Subscription status tracking
- Customer data management
- Secure API endpoints

## Project Structure

```
src/
├── components/
│   ├── SubscriptionPlans.tsx      # Plan display and selection
│   └── SubscriptionManagement.tsx # Active subscription management
├── pages/
│   ├── Account.tsx               # User account dashboard
│   ├── SubscriptionSuccess.tsx   # Success page
│   └── SubscriptionCancel.tsx    # Cancel page
├── services/
│   └── paymentService.ts         # Stripe integration
└── api/
    └── stripe.ts                 # Backend Stripe handlers
```

## Setup Instructions

1. **Environment Variables**
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   FRONTEND_URL=http://localhost:8080
   ```

2. **Installation**
   ```bash
   npm install
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run dev
   ```

## Available Routes

- `/pricing` - View subscription plans
- `/account` - Manage subscription and profile
- `/subscription/success` - Subscription success page
- `/subscription/cancel` - Subscription cancellation page

## Subscription Flow

1. User selects a plan at `/pricing`
2. Completes checkout through Stripe
3. Redirected to success/cancel page
4. Can manage subscription at `/account`

## Technical Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js, Node.js
- **Payment**: Stripe
- **State Management**: React Query
- **Routing**: React Router
- **UI Components**: Shadcn/UI

## Security Features

- Secure API endpoints
- Webhook signature verification
- Environment variable protection
- CORS configuration
- Type-safe API calls

## Development Status

✅ Completed:
- Basic subscription flow
- Plan display and selection
- Stripe integration
- Customer portal access
- Webhook handling

🚧 In Progress:
- Subscription analytics
- Usage tracking
- Advanced billing features

## Next Steps

1. Implement subscription analytics
2. Add usage tracking
3. Enhance billing features
4. Improve error handling
5. Add automated testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

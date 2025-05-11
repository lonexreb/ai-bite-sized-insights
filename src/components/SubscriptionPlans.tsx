import { useState } from 'react';
import { paymentService } from '../services/paymentService';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Access to basic AI insights',
      'Weekly newsletter',
      'Basic search functionality',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    interval: 'month',
    features: [
      'All Basic features',
      'Advanced AI insights',
      'Daily newsletter',
      'Priority support',
      'Custom categories',
      'API access'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'All Pro features',
      'Custom AI model training',
      'Dedicated support',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations'
    ]
  }
];

export default function SubscriptionPlans() {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setError(null);
    try {
      await paymentService.createCheckoutSession({
        planId,
        interval: selectedInterval,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/subscription/cancel`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 12 * 0.8).toFixed(2); // 20% discount for yearly
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Select the perfect plan for your AI insights needs
        </p>
      </div>

      {/* Billing Interval Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="relative bg-white rounded-lg p-1 flex">
          <button
            type="button"
            className={`${
              selectedInterval === 'month'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-gray-900'
            } relative py-2 px-6 rounded-md text-sm font-medium transition-colors`}
            onClick={() => setSelectedInterval('month')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${
              selectedInterval === 'year'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-gray-900'
            } relative py-2 px-6 rounded-md text-sm font-medium transition-colors`}
            onClick={() => setSelectedInterval('year')}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
              plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
            }`}
          >
            <div className="p-6">
              {plan.popular && (
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600">
                  Most Popular
                </span>
              )}
              <h3 className="mt-4 text-lg font-medium text-gray-900">{plan.name}</h3>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${selectedInterval === 'month' ? plan.price : getYearlyPrice(plan.price)}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /{selectedInterval}
                </span>
              </p>
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
                className={`mt-8 block w-full bg-blue-600 text-white rounded-md py-2 px-4 text-center font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                What's included
              </h4>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="text-base font-medium text-gray-900">
              Can I change my plan later?
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">
              What payment methods do you accept?
            </h4>
            <p className="mt-2 text-base text-gray-500">
              We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">
              Is there a free trial?
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Yes, we offer a 14-day free trial for all plans. No credit card required to start.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
    </div>
  );
} 
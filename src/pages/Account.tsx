import { useEffect, useState } from 'react';
import SubscriptionManagement from '../components/SubscriptionManagement';

interface UserSubscription {
  customerId: string;
  subscriptionStatus: 'active' | 'trialing' | 'canceled' | 'past_due' | 'unpaid';
  currentPlan: string;
  trialEndsAt?: Date;
}

export default function Account() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace this with your actual API call to get user's subscription data
    const fetchSubscription = async () => {
      try {
        // This is a mock response - replace with actual API call
        const mockSubscription: UserSubscription = {
          customerId: 'cus_mock123',
          subscriptionStatus: 'trialing',
          currentPlan: 'Pro Plan',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        };
        setSubscription(mockSubscription);
      } catch (err) {
        setError('Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Active Subscription</h2>
          <p className="text-gray-600 mb-4">You don't have an active subscription.</p>
          <a
            href="/pricing"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Plans
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
        
        <div className="space-y-8">
          <SubscriptionManagement
            customerId={subscription.customerId}
            subscriptionStatus={subscription.subscriptionStatus}
            currentPlan={subscription.currentPlan}
            trialEndsAt={subscription.trialEndsAt}
          />

          {/* Add more account settings sections here */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>
            {/* Add profile settings form here */}
          </div>
        </div>
      </div>
    </div>
  );
} 
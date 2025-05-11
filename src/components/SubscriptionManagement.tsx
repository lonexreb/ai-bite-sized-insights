import { useState } from 'react';
import { paymentService } from '../services/paymentService';

interface SubscriptionManagementProps {
  customerId: string;
  subscriptionStatus: 'active' | 'trialing' | 'canceled' | 'past_due' | 'unpaid';
  currentPlan: string;
  trialEndsAt?: Date;
}

export default function SubscriptionManagement({
  customerId,
  subscriptionStatus,
  currentPlan,
  trialEndsAt,
}: SubscriptionManagementProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManageSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await paymentService.createPortalSession(customerId);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open customer portal');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'trialing':
        return 'text-blue-600';
      case 'canceled':
        return 'text-red-600';
      case 'past_due':
        return 'text-yellow-600';
      case 'unpaid':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Management</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
          <p className="text-gray-600">{currentPlan}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Status</h3>
          <p className={`${getStatusColor(subscriptionStatus)} font-medium`}>
            {subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
          </p>
        </div>

        {trialEndsAt && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">Trial Period</h3>
            <p className="text-gray-600">
              Your trial ends on {trialEndsAt.toLocaleDateString()}
            </p>
          </div>
        )}

        <button
          onClick={handleManageSubscription}
          disabled={loading}
          className={`w-full bg-blue-600 text-white rounded-md py-2 px-4 text-center font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Loading...' : 'Manage Subscription'}
        </button>

        {error && (
          <div className="mt-4 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
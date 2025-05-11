import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pricing page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/pricing');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Subscription Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your subscription process was cancelled. You will be redirected to our pricing page shortly.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/pricing')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
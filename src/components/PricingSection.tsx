
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Free Tier",
      description: "Perfect for getting started with AI learning.",
      price: "Free",
      features: [
        "Access to weekly newsletter",
        "Basic AI concept breakdowns",
        "Limited community access",
        "1 tutorial per month"
      ],
      buttonText: "Sign Up Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Student",
      description: "Everything you need to stay ahead of your peers.",
      price: "$9.99",
      features: [
        "Full access to newsletter archives",
        "Premium AI concept breakdowns",
        "Complete community access",
        "Unlimited tutorial access",
        "Monthly study sessions"
      ],
      popular: true,
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      name: "Professional",
      description: "Advanced content for serious AI practitioners.",
      price: "$19.99",
      features: [
        "Everything in Student plan",
        "Research paper breakdowns",
        "Private study group access",
        "Implementation assistance",
        "Career guidance and mentorship"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include access to our core learning platform.
            Cancel anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <PricingCard
              key={i}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom plan for your team or organization?{" "}
            <a href="/contact" className="text-brand-purple hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}


import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const faqItems = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated accordingly."
    },
    {
      question: "Is there a student discount available?",
      answer: "Yes, we offer a special student discount. Please contact us with your valid student ID for verification."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Google Pay. For annual subscriptions, we also offer bank transfer options."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. Your access will remain active until the end of your billing period."
    },
    {
      question: "Do you offer team or group pricing?",
      answer: "Yes, we offer special pricing for teams of 5 or more. Please contact us for a custom quote."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 7-day free trial for the Student plan. No credit card required to try it out."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-brand-light-purple">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
              <p className="text-xl mb-8">
                Choose the plan that works for you. All plans include access to our core learning platform.
              </p>
              <Tabs defaultValue="monthly" className="w-fit mx-auto">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">Annual (20% off)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <PricingSection />
        
        <div className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {faqItems.map((item, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Have more questions? We're happy to help.
              </p>
              <a href="/contact" className="text-brand-purple hover:underline font-medium">
                Contact our support team →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

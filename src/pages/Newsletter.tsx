
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-brand-light-purple">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Weekly AI Insights Newsletter</h1>
              <p className="text-xl mb-8">
                Stay ahead with digestible explanations of complex AI topics delivered straight to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">What You'll Get</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Weekly Breakdown</h3>
                <p className="text-muted-foreground mb-4">
                  Each week, we break down a complex AI topic, research paper, or technique into 
                  easily digestible content that helps you build a solid understanding.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  See sample <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Code Examples</h3>
                <p className="text-muted-foreground mb-4">
                  Get practical code implementations and tutorials that reinforce your theoretical
                  understanding and help you apply concepts in real projects.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  See sample <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Mathematical Intuition</h3>
                <p className="text-muted-foreground mb-4">
                  Complex AI math explained intuitively with visualizations and step-by-step
                  derivations to build a solid foundation.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  See sample <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Industry Trends</h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated on the latest advancements, tools, and techniques in AI with our 
                  curated insights on industry trends.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  See sample <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-6">Join Over 2,000 AI Learners Today</h2>
              <div className="max-w-md mx-auto">
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <div className="py-16 bg-brand-light-skyblue">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to demystify AI?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are getting ahead with our digestible AI content.
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-skyblue hover:bg-brand-dark-skyblue">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-brand-skyblue text-brand-skyblue hover:text-brand-dark-skyblue hover:border-brand-dark-skyblue">
              <Link to="/tutorials">Browse Content</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

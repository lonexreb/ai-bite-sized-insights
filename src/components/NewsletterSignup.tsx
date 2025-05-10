
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSignup({
  variant = "default",
}: {
  variant?: "default" | "card" | "full-width";
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  if (variant === "card") {
    return (
      <div className="bg-brand-light-purple p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Get Weekly AI Bites</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Join our newsletter for weekly updates on the latest AI advancements and tutorials.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    );
  }

  if (variant === "full-width") {
    return (
      <div className="bg-brand-light-purple py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Stay ahead with weekly AI insights
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get the latest AI research and tutorials delivered straight to your inbox every week.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="max-w-64"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
}

export function PricingCard({
  name,
  description,
  price,
  features,
  popular = false,
  buttonText = "Get Started",
  buttonVariant = "default"
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${popular ? 'border-brand-purple shadow-md relative' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check size={16} className="text-brand-purple" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

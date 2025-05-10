
import { Card, CardContent } from "@/components/ui/card";
import { Brain, BookOpen, Users, Layers } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-brand-purple" />,
      title: "Weekly AI Breakdowns",
      description:
        "Digestible explanations of complex AI research papers and cutting-edge advancements delivered straight to your inbox.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-brand-purple" />,
      title: "Guided Tutorials",
      description:
        "Step-by-step tutorials that break down complex implementations with detailed code explanations.",
    },
    {
      icon: <Users className="h-8 w-8 text-brand-purple" />,
      title: "Community Learning",
      description:
        "Join study sessions with like-minded individuals and collaborate on projects with peers around the world.",
    },
    {
      icon: <Layers className="h-8 w-8 text-brand-purple" />,
      title: "Mathematical Intuition",
      description:
        "Clear explanations of the mathematical foundations behind modern AI techniques with a focus on intuitive understanding.",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Designed for the AI-Curious Student
          </h2>
          <p className="text-muted-foreground">
            We make complex AI topics accessible through focused content delivery and
            supportive learning experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-brand-light-purple p-3 w-fit mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

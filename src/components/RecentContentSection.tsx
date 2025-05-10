
import { ContentCard } from "./ContentCard";

export function RecentContentSection() {
  const recentContent = [
    {
      title: "Understanding Transformer Architecture",
      description: "A simple breakdown of the revolutionary architecture behind modern large language models.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Deep Learning",
      difficulty: "Intermediate" as const,
      link: "/tutorials/transformer-architecture",
    },
    {
      title: "Quantization Techniques for Model Efficiency",
      description: "Learn how to optimize your AI models for deployment with advanced quantization methods.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Optimization",
      difficulty: "Advanced" as const,
      link: "/tutorials/quantization-techniques",
    },
    {
      title: "Introduction to Linear Algebra for ML",
      description: "A foundational guide to the essential linear algebra concepts every AI practitioner should know.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Mathematics",
      difficulty: "Beginner" as const,
      link: "/tutorials/linear-algebra-ml",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Latest Tutorials</h2>
          <a href="/tutorials" className="text-brand-purple hover:underline font-medium">
            View all tutorials →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentContent.map((content, i) => (
            <ContentCard
              key={i}
              title={content.title}
              description={content.description}
              image={content.image}
              category={content.category}
              difficulty={content.difficulty}
              link={content.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

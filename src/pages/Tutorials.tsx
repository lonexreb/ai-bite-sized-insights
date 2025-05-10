
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentCard } from "@/components/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const tutorials = [
    {
      title: "Understanding Transformer Architecture",
      description: "A simple breakdown of the revolutionary architecture behind modern large language models.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Deep Learning",
      difficulty: "Intermediate" as const,
      link: "/tutorials/transformer-architecture",
      type: "tutorial",
    },
    {
      title: "Quantization Techniques for Model Efficiency",
      description: "Learn how to optimize your AI models for deployment with advanced quantization methods.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
      category: "Optimization",
      difficulty: "Advanced" as const,
      link: "/tutorials/quantization-techniques",
      type: "tutorial",
    },
    {
      title: "Introduction to Linear Algebra for ML",
      description: "A foundational guide to the essential linear algebra concepts every AI practitioner should know.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Mathematics",
      difficulty: "Beginner" as const,
      link: "/tutorials/linear-algebra-ml",
      type: "guide",
    },
    {
      title: "Reinforcement Learning from Scratch",
      description: "Build a comprehensive understanding of RL algorithms through hands-on implementation.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
      category: "Reinforcement Learning",
      difficulty: "Intermediate" as const,
      link: "/tutorials/reinforcement-learning",
      type: "course",
    },
    {
      title: "Practical GANs for Image Generation",
      description: "Learn to implement and train Generative Adversarial Networks for creative applications.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Generative AI",
      difficulty: "Advanced" as const,
      link: "/tutorials/practical-gans",
      type: "tutorial",
    },
    {
      title: "Backpropagation Algorithm Explained",
      description: "A visual and intuitive explanation of the fundamental algorithm behind neural networks.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
      category: "Deep Learning",
      difficulty: "Beginner" as const,
      link: "/tutorials/backpropagation-explained",
      type: "guide",
    },
  ];
  
  const filteredTutorials = tutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredByType = (type: string) => {
    if (type === "all") return filteredTutorials;
    return filteredTutorials.filter(tutorial => tutorial.type === type);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-brand-light-purple">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Learning Resources</h1>
              <p className="text-xl mb-8">
                Explore our library of tutorials, guides, and courses on AI topics.
              </p>
              <div className="max-w-lg mx-auto">
                <Input
                  type="search"
                  placeholder="Search tutorials, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="guide">Guides</TabsTrigger>
                <TabsTrigger value="course">Courses</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="beginner">Beginner Friendly</SelectItem>
                  <SelectItem value="advanced">Advanced Topics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredByType("all").map((tutorial, i) => (
                <ContentCard
                  key={i}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  category={tutorial.category}
                  difficulty={tutorial.difficulty}
                  link={tutorial.link}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorial" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredByType("tutorial").map((tutorial, i) => (
                <ContentCard
                  key={i}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  category={tutorial.category}
                  difficulty={tutorial.difficulty}
                  link={tutorial.link}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guide" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredByType("guide").map((tutorial, i) => (
                <ContentCard
                  key={i}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  category={tutorial.category}
                  difficulty={tutorial.difficulty}
                  link={tutorial.link}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="course" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredByType("course").map((tutorial, i) => (
                <ContentCard
                  key={i}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  category={tutorial.category}
                  difficulty={tutorial.difficulty}
                  link={tutorial.link}
                />
              ))}
            </div>
          </TabsContent>
        </div>
        
        <div className="py-12 bg-gray-50">
          <div className="container">
            <NewsletterSignup variant="full-width" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ContentCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  link: string;
}

export function ContentCard({ title, description, image, category, difficulty, link }: ContentCardProps) {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-brand-soft-yellow text-amber-800",
    Advanced: "bg-red-100 text-red-800"
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-brand-light-purple text-brand-dark-purple">
            {category}
          </Badge>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={link}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

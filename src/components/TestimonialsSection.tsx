
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "AI Bites helped me understand transformer architectures in just one week. The explanations are so clear and approachable!",
      author: "Alex Johnson",
      role: "CS Student, MIT",
    },
    {
      quote: "The mathematical explanations are intuitive yet rigorous. I finally understand the backpropagation algorithm properly.",
      author: "Priya Sharma",
      role: "ML Engineer",
    },
    {
      quote: "The community aspect is amazing. I connected with peers globally and we collaborate on projects now.",
      author: "Michael Chen",
      role: "Data Science Student",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who are staying ahead of their peers with
            our digestible AI content.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

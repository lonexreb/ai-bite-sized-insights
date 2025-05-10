
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-12 md:py-16 lg:py-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-brand-light-skyblue rounded-full opacity-40 -translate-x-1/2 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-soft-yellow rounded-full opacity-60 translate-x-1/3 translate-y-1/4"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-brand-soft-green rounded-full opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block bg-brand-light-skyblue text-brand-ocean-blue rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              Stay ahead in the AI revolution
            </div>
            <h1 className="scroll-m-20 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Learn <span className="text-brand-skyblue">AI</span> in simple, digestible bites
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              From complex algorithms to cutting-edge research papers, we break down advanced AI concepts into
              easy-to-understand weekly bites that keep you ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="rounded-full bg-brand-skyblue hover:bg-brand-dark-skyblue">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-brand-skyblue text-brand-skyblue hover:text-brand-dark-skyblue hover:border-brand-dark-skyblue">
                <Link to="/tutorials">Explore Tutorials</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                    {i}
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">2,000+</span> students already learning
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-light-skyblue to-brand-soft-yellow p-1 rounded-2xl">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
                  alt="AI visualization" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">This Week's Bite</h3>
                      <p className="text-sm text-muted-foreground">Breaking down transformer architecture</p>
                    </div>
                    <span className="bg-brand-soft-green text-green-700 text-xs rounded-full px-2 py-1">New</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-4/6"></div>
                  </div>
                  <Button className="w-full mt-5 bg-brand-skyblue hover:bg-brand-dark-skyblue">Read now</Button>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-soft-yellow rounded-lg rotate-12 animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-brand-light-skyblue rounded-lg -rotate-12 animate-float"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

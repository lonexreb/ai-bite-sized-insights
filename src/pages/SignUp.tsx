
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms & Conditions.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
      });
      setIsLoading(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-brand-light-skyblue">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left column with form */}
              <div className="w-full lg:w-1/2">
                <h1 className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                  Join our <span className="text-brand-skyblue">AI Learning</span> Community
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Get access to premium AI tutorials, weekly insights, and connect with fellow learners around the world.
                </p>
                
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with a number and special character
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agreeTerms"
                        name="agreeTerms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, agreeTerms: checked as boolean}))}
                      />
                      <label 
                        htmlFor="agreeTerms" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the <Link to="/terms" className="text-brand-skyblue hover:underline">Terms & Conditions</Link>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-brand-skyblue hover:bg-brand-dark-skyblue"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Already have an account? <Link to="/login" className="text-brand-skyblue hover:underline">Log in</Link>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Right column with benefits */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-6">Why Join Our Community?</h2>
                  
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-light-skyblue flex items-center justify-center text-brand-skyblue font-bold">1</div>
                      <div>
                        <h3 className="font-semibold">Weekly AI Breakdowns</h3>
                        <p className="text-muted-foreground">Get the latest AI advancements explained in simple terms</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-light-skyblue flex items-center justify-center text-brand-skyblue font-bold">2</div>
                      <div>
                        <h3 className="font-semibold">Hands-on Tutorials</h3>
                        <p className="text-muted-foreground">Step-by-step guides to build your skills with practical examples</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-light-skyblue flex items-center justify-center text-brand-skyblue font-bold">3</div>
                      <div>
                        <h3 className="font-semibold">Community Support</h3>
                        <p className="text-muted-foreground">Connect with like-minded learners and share your progress</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-light-skyblue flex items-center justify-center text-brand-skyblue font-bold">4</div>
                      <div>
                        <h3 className="font-semibold">Expert Resources</h3>
                        <p className="text-muted-foreground">Access our curated library of resources and tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What Our Members Are Saying
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "The weekly AI breakdowns have helped me stay updated without spending hours on research.",
                  author: "Sarah K.",
                  role: "Data Scientist"
                },
                {
                  quote: "I've gone from AI novice to implementing models in my work in just 3 months.",
                  author: "Michael T.",
                  role: "Software Engineer"
                },
                {
                  quote: "The community aspect has been invaluable. I've connected with people who have helped me grow.",
                  author: "Priya M.",
                  role: "Product Manager"
                },
                {
                  quote: "The tutorials are perfect - technical enough to be useful but simple enough to understand.",
                  author: "James W.",
                  role: "UX Designer"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-brand-light-skyblue p-6 rounded-lg shadow">
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <div className="py-16 bg-gray-50">
          <div className="container max-w-3xl">
            <NewsletterSignup variant="card" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;

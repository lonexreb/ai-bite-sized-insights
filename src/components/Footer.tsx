
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t py-12 md:py-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-brand-purple p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <span className="text-lg font-bold">AI Bites</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Digestible AI learning in bite-sized formats. Stay ahead of the curve with simple breakdowns of complex topics.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/newsletter" className="text-sm text-muted-foreground hover:text-primary">
                Newsletter
              </Link>
            </li>
            <li>
              <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary">
                Tutorials
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-sm text-muted-foreground hover:text-primary">
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Bites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import { Leaf, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg font-headline">BioRitm</span>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BioRitm Marketplace. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              123 Wellness Ave, Health City, 12345
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

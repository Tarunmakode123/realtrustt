import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import footerBg from '@/assets/footer-bg.jpg';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const { addNewsletter } = useData();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    addNewsletter(email);
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact">
      {/* CTA Section */}
      <div
        className="relative py-20"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary-foreground mb-4">
            Learn more about our listing process, as well as our additional staging and design work.
          </h2>
          <Button variant="hero" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Newsletter & Navigation */}
      <div className="bg-primary py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Newsletter */}
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground text-sm whitespace-nowrap">Subscribe Us</span>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-l-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent w-48 md:w-56"
                />
                <Button type="submit" variant="accent" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary-dark py-6 border-t border-primary-foreground/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5 text-accent" />
              <span className="text-lg font-heading font-semibold text-primary-foreground">
                Real<span className="text-accent">Trust</span>
              </span>
            </Link>

            {/* Copyright */}
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} RealTrust. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

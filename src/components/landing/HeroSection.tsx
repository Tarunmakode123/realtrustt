import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const { addContact } = useData();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.city) {
      toast.error('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    addContact(formData);
    toast.success('Thank you! We will contact you soon.');
    setFormData({ fullName: '', email: '', mobile: '', city: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, hsla(210, 60%, 15%, 0.95) 0%, hsla(210, 60%, 15%, 0.7) 50%, hsla(210, 60%, 15%, 0.4) 100%)',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Consultation,<br />
              Design,<br />
              <span className="text-accent">& Marketing</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg mb-8">
              We help you find your dream home with expert consultation, stunning design, and strategic marketing that delivers results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                Explore Properties
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-card rounded-xl shadow-xl p-6 md:p-8 max-w-md ml-auto">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                Get a Free Consultation
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Area, City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input-field"
                />
                <Button
                  type="submit"
                  variant="accent"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Button } from '@/components/ui/button';
import aboutImage from '@/assets/about-image.jpg';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Not Your Average Realtor */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/20 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full" />
              <img
                src={aboutImage}
                alt="Real estate consultation"
                className="relative z-10 rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="section-title">Not Your Average Realtor</h2>
            <div className="h-1 w-16 bg-accent mb-6" />
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We're not just selling houses – we're building dreams. Our team of expert realtors combines decades of experience with cutting-edge technology to deliver exceptional results for our clients.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're buying your first home, upgrading to your dream property, or looking for the best return on your investment, we have the expertise and dedication to make it happen.
            </p>
            <Button variant="default" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Why Choose Us */}
        <div id="services" className="text-center mb-12 pt-8">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="h-1 w-16 bg-accent mx-auto mt-2 mb-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Potential ROI</h3>
            <p className="text-muted-foreground text-sm">
              We analyze market trends to maximize your return on investment with data-driven strategies.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Design</h3>
            <p className="text-muted-foreground text-sm">
              Our design experts help stage and present properties to attract the right buyers.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Marketing</h3>
            <p className="text-muted-foreground text-sm">
              Strategic marketing campaigns that put your property in front of qualified buyers.
            </p>
          </div>
        </div>

        {/* About Us */}
        <div className="mt-20 text-center">
          <h2 className="section-title">About Us</h2>
          <div className="h-1 w-16 bg-accent mx-auto mt-2 mb-6" />
          <p className="section-subtitle mb-8">
            Fifteen years of experience in real estate, combined with a passion for helping people find their perfect home. We've built lasting relationships and a trusted reputation in the industry.
          </p>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

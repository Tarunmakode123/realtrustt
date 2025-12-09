import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { ClientsSection } from '@/components/landing/ClientsSection';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ClientsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

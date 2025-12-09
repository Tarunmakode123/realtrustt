import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';

export const ProjectsSection = () => {
  const { projects } = useData();

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Projects</h2>
          <div className="h-1 w-16 bg-accent mx-auto mt-2 mb-4" />
          <p className="section-subtitle">
            We know what buyers are looking for and suggest projects that will bring creative top dollar for the sale of their homes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card rounded-xl overflow-hidden shadow-card card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <span className="text-accent font-medium text-sm">{project.category}</span>
                <h3 className="text-foreground font-medium mt-1 line-clamp-2">{project.name}</h3>
                <Button
                  variant="accent"
                  size="sm"
                  className="mt-3 w-full"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

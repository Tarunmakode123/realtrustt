import { useData } from '@/context/DataContext';
import { Quote } from 'lucide-react';

export const ClientsSection = () => {
  const { clients } = useData();

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Quote className="w-6 h-6 text-accent" />
          </div>
          <h2 className="section-title">Happy Clients</h2>
          <div className="h-1 w-16 bg-accent mx-auto mt-2 mb-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="bg-card rounded-xl p-6 shadow-card card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-2 mb-4">
                <Quote className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {client.description}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{client.name}</h4>
                  <p className="text-accent text-sm">{client.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

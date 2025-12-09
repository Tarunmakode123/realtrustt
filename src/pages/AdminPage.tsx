import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import {
  Home,
  LayoutDashboard,
  FolderOpen,
  Users,
  MessageSquare,
  Mail,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

type TabType = 'projects' | 'clients' | 'contacts' | 'newsletters';

const AdminPage = () => {
  const { projects, clients, contacts, newsletters, addProject, addClient, deleteProject, deleteClient } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const projectFileRef = useRef<HTMLInputElement>(null);

  // Client form state
  const [clientForm, setClientForm] = useState({
    name: '',
    designation: '',
    description: '',
  });
  const [clientImage, setClientImage] = useState<string | null>(null);
  const clientFileRef = useRef<HTMLInputElement>(null);

  const handleProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClientImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description || !projectForm.category || !projectImage) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }
    addProject({
      ...projectForm,
      image: projectImage,
    });
    toast.success('Project added successfully');
    setProjectForm({ name: '', description: '', category: '' });
    setProjectImage(null);
    setShowProjectForm(false);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.designation || !clientForm.description || !clientImage) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }
    addClient({
      ...clientForm,
      image: clientImage,
    });
    toast.success('Client added successfully');
    setClientForm({ name: '', designation: '', description: '' });
    setClientImage(null);
    setShowClientForm(false);
  };

  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', icon: FolderOpen, count: projects.length },
    { id: 'clients' as TabType, label: 'Clients', icon: Users, count: clients.length },
    { id: 'contacts' as TabType, label: 'Contacts', icon: MessageSquare, count: contacts.length },
    { id: 'newsletters' as TabType, label: 'Newsletters', icon: Mail, count: newsletters.length },
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-5 w-5 text-accent" />
                <span className="text-lg font-heading font-semibold">
                  Real<span className="text-accent">Trust</span>
                </span>
              </Link>
              <span className="text-primary-foreground/60">|</span>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-medium">Admin Panel</span>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline-light" size="sm">
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-accent text-accent-foreground' : 'bg-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">Manage Projects</h2>
              <Button onClick={() => setShowProjectForm(true)} variant="accent">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>

            {showProjectForm && (
              <div className="bg-card rounded-xl p-6 shadow-card mb-6 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Add New Project</h3>
                  <button onClick={() => setShowProjectForm(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Project Name</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="input-field"
                        placeholder="e.g., Luxury Villa, Miami"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select category</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Design">Design</option>
                        <option value="Marketing & Design">Marketing & Design</option>
                        <option value="Consultation & Marketing">Consultation & Marketing</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="input-field min-h-[100px]"
                      placeholder="Project description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Project Image</label>
                    <input
                      type="file"
                      ref={projectFileRef}
                      onChange={handleProjectImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {projectImage ? (
                      <div className="relative w-40 h-28">
                        <img src={projectImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setProjectImage(null)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => projectFileRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        Upload Image
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="accent">
                      Add Project
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowProjectForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <img src={project.image} alt={project.name} className="w-16 h-12 object-cover rounded" />
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">{project.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              deleteProject(project.id);
                              toast.success('Project deleted');
                            }}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">Manage Clients</h2>
              <Button onClick={() => setShowClientForm(true)} variant="accent">
                <Plus className="h-4 w-4" />
                Add Client
              </Button>
            </div>

            {showClientForm && (
              <div className="bg-card rounded-xl p-6 shadow-card mb-6 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Add New Client</h3>
                  <button onClick={() => setShowClientForm(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Client Name</label>
                      <input
                        type="text"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        className="input-field"
                        placeholder="e.g., John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Designation</label>
                      <input
                        type="text"
                        value={clientForm.designation}
                        onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                        className="input-field"
                        placeholder="e.g., CEO, Company Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Testimonial</label>
                    <textarea
                      value={clientForm.description}
                      onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                      className="input-field min-h-[100px]"
                      placeholder="Client testimonial..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Client Photo</label>
                    <input
                      type="file"
                      ref={clientFileRef}
                      onChange={handleClientImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {clientImage ? (
                      <div className="relative w-20 h-20">
                        <img src={clientImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                        <button
                          type="button"
                          onClick={() => setClientImage(null)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => clientFileRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        Upload Photo
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="accent">
                      Add Client
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowClientForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Photo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Designation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <img src={client.image} alt={client.name} className="w-12 h-12 object-cover rounded-full" />
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">{client.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{client.designation}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              deleteClient(client.id);
                              toast.success('Client deleted');
                            }}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">Contact Form Submissions</h2>
              <p className="text-muted-foreground mt-1">View all contact form submissions from the landing page.</p>
            </div>

            {contacts.length === 0 ? (
              <div className="bg-card rounded-xl shadow-card p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Submissions Yet</h3>
                <p className="text-muted-foreground">Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Full Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Mobile</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 text-foreground font-medium">{contact.fullName}</td>
                          <td className="px-6 py-4 text-muted-foreground">{contact.email}</td>
                          <td className="px-6 py-4 text-muted-foreground">{contact.mobile}</td>
                          <td className="px-6 py-4 text-muted-foreground">{contact.city}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === 'newsletters' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">Newsletter Subscriptions</h2>
              <p className="text-muted-foreground mt-1">View all newsletter subscriptions from the landing page.</p>
            </div>

            {newsletters.length === 0 ? (
              <div className="bg-card rounded-xl shadow-card p-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Subscriptions Yet</h3>
                <p className="text-muted-foreground">Newsletter subscriptions will appear here.</p>
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">#</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Subscribed On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {newsletters.map((sub, index) => (
                        <tr key={sub.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 text-muted-foreground">{index + 1}</td>
                          <td className="px-6 py-4 text-foreground font-medium">{sub.email}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

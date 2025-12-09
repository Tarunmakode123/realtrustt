import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Client, ContactSubmission, NewsletterSubscription } from '@/types';

// Import default images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import client1 from '@/assets/client-1.jpg';
import client2 from '@/assets/client-2.jpg';
import client3 from '@/assets/client-3.jpg';
import client4 from '@/assets/client-4.jpg';
import client5 from '@/assets/client-5.jpg';

// Default data
const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'Skyline Residences, Manhattan',
    description: 'Consultation',
    category: 'Consultation',
    image: project1,
  },
  {
    id: '2',
    name: 'Ocean View Towers, Miami',
    description: 'Design',
    category: 'Design',
    image: project2,
  },
  {
    id: '3',
    name: 'Green Valley Estate, Austin',
    description: 'Marketing & Design',
    category: 'Marketing & Design',
    image: project3,
  },
  {
    id: '4',
    name: 'Urban Lofts, Seattle',
    description: 'Consultation & Marketing',
    category: 'Consultation & Marketing',
    image: project4,
  },
  {
    id: '5',
    name: 'Sunset Hills, Los Angeles',
    description: 'Consultation',
    category: 'Consultation',
    image: project5,
  },
];

const defaultClients: Client[] = [
  {
    id: '1',
    name: 'Rowhan Smith',
    designation: 'CEO, Foreclosure',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: client1,
  },
  {
    id: '2',
    name: 'Shipra Kayak',
    designation: 'Brand Designer',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: client2,
  },
  {
    id: '3',
    name: 'John Lepore',
    designation: 'CEO, Foreclosure',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: client3,
  },
  {
    id: '4',
    name: 'Marry Freeman',
    designation: 'Marketing Manager at Mixit',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: client4,
  },
  {
    id: '5',
    name: 'Lucy Chen',
    designation: 'Sales Rep at Alibaba',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: client5,
  },
];

interface DataContextType {
  projects: Project[];
  clients: Client[];
  contacts: ContactSubmission[];
  newsletters: NewsletterSubscription[];
  addProject: (project: Omit<Project, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  addContact: (contact: Omit<ContactSubmission, 'id' | 'createdAt'>) => void;
  addNewsletter: (email: string) => void;
  deleteProject: (id: string) => void;
  deleteClient: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
    };
    setClients((prev) => [...prev, newClient]);
  };

  const addContact = (contact: Omit<ContactSubmission, 'id' | 'createdAt'>) => {
    const newContact: ContactSubmission = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const addNewsletter = (email: string) => {
    const existing = newsletters.find((n) => n.email === email);
    if (!existing) {
      const newSubscription: NewsletterSubscription = {
        id: Date.now().toString(),
        email,
        createdAt: new Date().toISOString(),
      };
      setNewsletters((prev) => [...prev, newSubscription]);
    }
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        clients,
        contacts,
        newsletters,
        addProject,
        addClient,
        addContact,
        addNewsletter,
        deleteProject,
        deleteClient,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

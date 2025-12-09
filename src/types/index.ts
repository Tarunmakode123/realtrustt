export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
}

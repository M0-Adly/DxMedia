export type ProjectCategory = 'images' | 'motion' | 'video' | 'ads' | 'web' | 'ai' | 'data' | 'other';

export interface Project {
  id: string;
  title: string;
  description?: string;
  category: ProjectCategory;
  image_url?: string;
  project_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar_url?: string;
  image_url?: string;
  link_url?: string;
  content?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  is_read: boolean;
  created_at: string;
}

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}

export interface HeroStats {
  clients: string;
  projects: string;
  years: string;
}

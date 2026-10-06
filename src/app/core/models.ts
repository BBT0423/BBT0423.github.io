export type Lang = 'en' | 'th';

export interface Link {
  label: string;
  url: string;
}

export interface Stat {
  value: string;
  label: string;
  sub?: string;
}

export interface ExperienceItem {
  name: string;
  badge?: string;
  stack?: string;
  slug?: string;
  bullets: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  items: ExperienceItem[];
}

export interface TimelineEntry {
  date: string;
  text: string;
}

export interface ModuleCommits {
  name: string;
  commits: number;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Highlight {
  title: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  summary: string;
  bullets: string[];
  private: boolean;
  featured: boolean;
  links: Link[];
  highlights?: Highlight[];
}

export interface Education {
  degree: string;
  school: string;
  period?: string;
}

export interface Profile {
  name: string;
  nickname: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  photo?: string;
  resumeUrl?: string;
  emails?: string[];
  phone?: string;
}

export interface PortfolioContent {
  profile: Profile;
  stats: Stat[];
  experience: Experience[];
  timeline: TimelineEntry[];
  modules: ModuleCommits[];
  skills: SkillGroup[];
  projects: Project[];
  learning: string[];
  education: Education;
}

// src/types/github.ts

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  location: string | null; // <-- ADD THIS
  company: string | null;  // <-- ADD THIS
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  size: number;
  updated_at: string;
}

// This is our CUSTOM data structure that we will generate from the raw data
export interface LanguageStat {
  name: string;
  count: number; // How many repos use this as their primary language
}

export interface ProcessedDossier {
  user: GitHubUser;
  topRepos: GitHubRepo[];
  languages: LanguageStat[];
}
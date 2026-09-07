// src/api/github.ts
import axios from 'axios';
import type { GitHubUser, GitHubRepo } from '../types/github';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  const { data } = await api.get<GitHubUser>(`/users/${username}`);
  return data;
};

export const fetchRepos = async (username: string): Promise<GitHubRepo[]> => {
  // Fetch up to 100 repos, sorted by recently pushed
  const { data } = await api.get<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100&sort=pushed`
  );
  return data;
};
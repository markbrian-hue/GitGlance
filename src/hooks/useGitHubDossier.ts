// src/hooks/useGitHubDossier.ts
import { useState } from 'react';
import { fetchUser, fetchRepos } from '../api/github';
import type { ProcessedDossier, LanguageStat } from '../types/github';

export const useGitHubDossier = () => {
  const [dossier, setDossier] = useState<ProcessedDossier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeUser = async (username: string) => {
    if (!username.trim()) return;

    // 1. Check our local "database" (sessionStorage) to avoid API limits
    const cachedData = sessionStorage.getItem(`gitglance_${username.toLowerCase()}`);
    if (cachedData) {
      setDossier(JSON.parse(cachedData));
      return;
    }

    setLoading(true);
    setError(null);
    setDossier(null);

    try {
      // 2. Fetch User and Repos in parallel for speed
      const [userData, reposData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);

      // 3. Transform Data: Calculate Language Statistics
      const languageMap: Record<string, number> = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
        }
      });

      // Convert map to sorted array
      const languages: LanguageStat[] = Object.entries(languageMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count); // Sort by highest count

      // 4. Transform Data: Get top 6 repos by stars
      const topRepos = [...reposData]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      // 5. Assemble the final dossier
      const finalDossier: ProcessedDossier = {
        user: userData,
        topRepos,
        languages,
      };

      // 6. Save to cache
      sessionStorage.setItem(`gitglance_${username.toLowerCase()}`, JSON.stringify(finalDossier));
      
      setDossier(finalDossier);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("USER_NOT_FOUND");
      } else if (err.response?.status === 403) {
        setError("RATE_LIMIT_EXCEEDED");
      } else {
        setError("UNKNOWN_ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearDossier = () => setDossier(null);

  return { dossier, loading, error, analyzeUser, clearDossier };
};
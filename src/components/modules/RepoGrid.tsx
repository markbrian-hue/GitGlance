import type { GitHubRepo } from '../../types/github';
import { Star, GitFork, HardDrive } from 'lucide-react';

interface Props {
  repos: GitHubRepo[];
}

export function RepoGrid({ repos }: Props) {
  if (!repos.length) return null;

  return (
    <div className="border border-quant-border bg-quant-surface">
      <div className="border-b border-quant-border p-4 bg-quant-bg">
        <h3 className="font-mono text-xs text-quant-muted uppercase tracking-widest">Top Repositories (By Stars)</h3>
      </div>
      {/* Strict 1px border grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className={`p-6 hover:bg-quant-bg transition-colors flex flex-col group border-quant-border 
              ${index < 3 ? 'border-b' : ''} 
              ${(index + 1) % 3 !== 0 ? 'md:border-r' : ''}
              ${index !== repos.length - 1 ? 'border-b md:border-b-0' : ''}
            `}
          >
            <div className="flex-1">
              <h4 className="font-sans text-lg font-medium text-quant-text group-hover:text-quant-accent transition-colors truncate mb-2">
                {repo.name}
              </h4>
              <p className="font-sans text-sm text-quant-muted line-clamp-2 mb-6 h-10">
                {repo.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-quant-muted">
              {repo.language && (
                <span className="flex items-center gap-1.5 text-quant-text">
                  <span className="w-2 h-2 bg-quant-border block"></span>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" /> {repo.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" /> {Math.max(1, Math.round(repo.size / 1024))}MB
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
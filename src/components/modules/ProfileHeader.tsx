import type { GitHubUser } from '../../types/github';
import { MapPin, Building2, Calendar } from 'lucide-react';

interface Props {
  user: GitHubUser;
}

export function ProfileHeader({ user }: Props) {
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div className="border border-quant-border bg-quant-surface flex flex-col md:flex-row relative">
      
      {/* Avatar Area - Strict Square, Grayscale */}
      <div className="shrink-0 border-b md:border-b-0 md:border-r border-quant-border p-6 md:p-8 flex items-start justify-center bg-quant-bg">
        <div className="border border-quant-border p-1 bg-quant-surface">
          <img 
            src={user.avatar_url} 
            alt={user.login} 
            className="w-32 h-32 md:w-48 md:h-48 object-cover grayscale contrast-125"
          />
        </div>
      </div>

      {/* User Details Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 md:p-8 flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:justify-between mb-4">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl text-quant-text italic tracking-tight">
                {user.name || user.login}
              </h2>
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="font-mono text-quant-accent text-sm hover:underline mt-2 inline-block"
              >
                @{user.login}
              </a>
            </div>
          </div>
          
          {user.bio && (
            <p className="font-sans text-quant-muted text-sm max-w-2xl leading-relaxed mb-6">
              {user.bio}
            </p>
          )}

          {/* Meta information tags */}
          <div className="flex flex-wrap gap-6 font-mono text-xs text-quant-muted">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span className="uppercase">{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                <span className="uppercase">{user.company}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span className="uppercase">JOINED {joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Strict Grid Stats Bar */}
        <div className="grid grid-cols-3 border-t border-quant-border text-center">
          <div className="border-r border-quant-border p-4 bg-quant-bg">
            <p className="font-mono text-[10px] text-quant-muted uppercase tracking-widest mb-1">Repositories</p>
            <p className="font-sans text-xl md:text-2xl font-medium text-quant-text">{user.public_repos}</p>
          </div>
          <div className="border-r border-quant-border p-4 bg-quant-bg">
            <p className="font-mono text-[10px] text-quant-muted uppercase tracking-widest mb-1">Followers</p>
            <p className="font-sans text-xl md:text-2xl font-medium text-quant-text">{user.followers}</p>
          </div>
          <div className="p-4 bg-quant-bg">
            <p className="font-mono text-[10px] text-quant-muted uppercase tracking-widest mb-1">Following</p>
            <p className="font-sans text-xl md:text-2xl font-medium text-quant-text">{user.following}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
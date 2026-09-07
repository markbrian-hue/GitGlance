import { useState } from 'react';
import { Search, Activity, Download } from 'lucide-react';
import { useGitHubDossier } from './hooks/useGitHubDossier';
import { ProfileHeader } from './components/modules/ProfileHeader';
import { LanguageChart } from './components/modules/LanguageChart';
import { RepoGrid } from './components/modules/RepoGrid';
import { DossierSkeleton } from './components/feedback/DossierSkeleton';
import { exportDossierToImage } from './utils/exportImage';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const { dossier, loading, error, analyzeUser } = useGitHubDossier();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeUser(searchInput);
  };

  // Keep search centered only during initial visit with no query underway
  const isCentered = !dossier && !loading && !error;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="flex-1 border border-quant-border flex flex-col relative p-4 md:p-8">
        
        {/* Top Bar Navigation Area */}
        <div className={`flex w-full transition-all duration-300 ease-in-out ${isCentered ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-8 items-center justify-between'}`}>
          <h1 className="font-serif text-3xl text-quant-text italic tracking-tight">GitGlance.</h1>
          
          <form onSubmit={handleSearch} className="relative group w-full max-w-sm ml-8">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${loading ? 'text-quant-accent animate-pulse' : 'text-quant-muted group-focus-within:text-quant-accent'}`} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search another handle..."
              disabled={loading}
              className="w-full bg-quant-surface border border-quant-border text-quant-text pl-10 pr-4 py-2 font-mono text-xs outline-none focus:border-quant-accent transition-colors placeholder:text-quant-border disabled:opacity-50"
            />
          </form>
        </div>

        {/* Centered Initial Search State */}
        {isCentered && (
          <div className="w-full max-w-lg mx-auto my-auto space-y-12 pb-24">
            <div className="space-y-4 text-center">
              <h1 className="font-serif text-6xl md:text-8xl tracking-tight text-quant-text italic">GitGlance.</h1>
              <p className="font-mono text-quant-muted text-xs uppercase tracking-widest">Visual GitHub Analytics Engine</p>
            </div>
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quant-muted group-focus-within:text-quant-accent transition-colors" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter GitHub handle (e.g., torvalds)"
                className="w-full bg-quant-surface border border-quant-border text-quant-text pl-12 pr-4 py-4 font-mono text-sm outline-none focus:border-quant-accent transition-colors placeholder:text-quant-border"
              />
            </form>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <DossierSkeleton />}

        {/* Error State */}
        {error && !loading && (
          <div className="w-full max-w-4xl mx-auto border border-quant-accent/50 bg-[#1a0f0a] p-6 text-center space-y-2 mt-12">
            <Activity className="w-6 h-6 text-quant-accent mx-auto mb-4" />
            <p className="font-mono text-quant-accent uppercase tracking-widest text-sm">ERR: {error}</p>
            <p className="font-sans text-quant-muted text-sm">
              {error === 'USER_NOT_FOUND' 
                ? 'The requested GitHub profile does not exist.' 
                : error === 'RATE_LIMIT_EXCEEDED' 
                ? 'GitHub API 60 req/hr rate limit reached. Please wait or use a personal token.' 
                : 'An unexpected error occurred while fetching the profile.'}
            </p>
          </div>
        )}

        {/* The Dossier View */}
        {dossier && !loading && (
          <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24">
            
            {/* The wrapper ID allows html2canvas to capture exactly this section */}
            <div id="dossier-report" className="space-y-8 bg-quant-bg p-1 rounded-none">
              <ProfileHeader user={dossier.user} />
              <div className="grid grid-cols-1 gap-8">
                <LanguageChart languages={dossier.languages} />
                <RepoGrid repos={dossier.topRepos} />
              </div>
            </div>

            {/* The Export Action Bar */}
            <div className="flex justify-end pt-8 border-t border-quant-border border-dashed">
              <button 
                onClick={() => exportDossierToImage('dossier-report', dossier.user.login)}
                className="group flex items-center gap-3 bg-quant-surface border border-quant-border hover:border-quant-accent px-6 py-3 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-quant-muted group-hover:text-quant-accent transition-colors" />
                <span className="font-mono text-xs tracking-widest uppercase text-quant-text group-hover:text-quant-accent transition-colors">
                  Export Report
                </span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
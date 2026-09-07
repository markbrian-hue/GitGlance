import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { LanguageStat } from '../../types/github';

interface Props {
  languages: LanguageStat[];
}

export function LanguageChart({ languages }: Props) {
  if (!languages.length) return null;

  // The Quant Palette: Stark, high contrast. 
  // Rust Accent -> Pure White -> Muted Gray -> Dark Gray -> Surface
  const COLORS = ['#E05D34', '#F3F4F6', '#8C8C8C', '#262626', '#0F0F0F'];

  return (
    <div className="border border-quant-border bg-quant-surface flex flex-col h-full">
      <div className="border-b border-quant-border p-4 bg-quant-bg">
        <h3 className="font-mono text-xs text-quant-muted uppercase tracking-widest">Language Distribution (All Repos)</h3>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row items-center p-6 gap-8">
        <div className="w-full md:w-1/2 h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languages}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="count"
                stroke="none"
              >
                {languages.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#050505', 
                  border: '1px solid #262626',
                  borderRadius: '0px',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px'
                }}
                itemStyle={{ color: '#F3F4F6' }}
                formatter={(value: any) => [`${value} Repositories`, 'Usage']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 font-mono text-xs space-y-3">
          {languages.slice(0, 5).map((lang, index) => (
            <div key={lang.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 block border border-quant-border"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-quant-text">{lang.name}</span>
              </div>
              <span className="text-quant-muted">{lang.count}</span>
            </div>
          ))}
          {languages.length > 5 && (
            <div className="text-quant-muted pt-2 border-t border-quant-border border-dashed text-right">
              + {languages.length - 5} more languages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
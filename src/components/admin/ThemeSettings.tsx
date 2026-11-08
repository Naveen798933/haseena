import React from 'react';
import { SiteContent } from '../../types';
import { Palette, RefreshCw, Sparkles } from 'lucide-react';
import { DEFAULT_CONTENT } from '../../data/defaultContent';

interface ThemeSettingsProps {
  theme: SiteContent['theme'];
  onChange: (theme: SiteContent['theme']) => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ theme, onChange }) => {
  const handleColorChange = (key: keyof SiteContent['theme'], val: string | number) => {
    onChange({
      ...theme,
      [key]: val
    });
  };

  const handleResetTheme = () => {
    onChange(DEFAULT_CONTENT.theme);
  };

  const themeColors: { key: keyof SiteContent['theme']; label: string; desc: string }[] = [
    { key: 'burgundy', label: 'Deep Burgundy', desc: 'Primary atmospheric background (#3B0A1E)' },
    { key: 'wine', label: 'Wine Red', desc: 'Emotional romantic tone & accents (#64152D)' },
    { key: 'champagne', label: 'Champagne Gold', desc: 'Luxury typography, icons & borders (#D6B779)' },
    { key: 'blush', label: 'Soft Blush Pink', desc: 'Gentle card highlights & petals (#F4DCE2)' },
    { key: 'ivory', label: 'Warm Ivory', desc: 'Editorial body typography (#FFF8F0)' },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
          <div className="flex items-center gap-2 text-champagne">
            <Palette className="w-5 h-5" />
            <h4 className="font-serif text-xl text-ivory">Design Theme & Atmosphere</h4>
          </div>

          <button
            onClick={handleResetTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy-950 border border-champagne/30 text-champagne hover:bg-wine text-xs font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Colors
          </button>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {themeColors.map(({ key, label, desc }) => (
            <div key={key} className="p-4 rounded-xl bg-burgundy-950/80 border border-champagne/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-champagne font-mono font-medium">
                  {label}
                </span>
                <input
                  type="color"
                  value={theme[key] as string}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-8 h-8 rounded-lg border border-champagne/40 bg-transparent cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-ivory/60 font-light">{desc}</p>
              <div className="pt-2 text-xs font-mono text-champagne/80">
                HEX: {theme[key]}
              </div>
            </div>
          ))}
        </div>

        {/* Rose Petal Density */}
        <div className="pt-4 border-t border-champagne/15 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-champagne/80 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-champagne" />
              Floating Rose Petals Density
            </label>
            <span className="text-xs font-mono text-champagne font-bold">
              {theme.petalCount} petals
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="2"
            value={theme.petalCount}
            onChange={(e) => handleColorChange('petalCount', parseInt(e.target.value))}
            className="w-full h-1.5 bg-burgundy-950 rounded-lg appearance-none cursor-pointer accent-champagne"
          />
        </div>

      </div>
    </div>
  );
};


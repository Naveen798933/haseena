import React, { useState, useEffect } from 'react';
import { SiteContent, AdminUser, ProposalResponseRecord } from '../../types';
import { saveSiteContent, logoutAdmin, getProposalResponses, clearProposalResponses } from '../../firebase/services';
import { isFirebaseConfigured } from '../../firebase/config';
import { PhotoManager } from './PhotoManager';
import { ContentEditor } from './ContentEditor';
import { AudioSettings } from './AudioSettings';
import { ThemeSettings } from './ThemeSettings';
import { FirebaseSetupGuide } from './FirebaseSetupGuide';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Edit3,
  Music,
  Palette,
  Shield,
  Save,
  Eye,
  LogOut,
  Heart,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Download,
  Trash2,
  Copy,
  Check
} from 'lucide-react';

interface AdminDashboardProps {
  initialContent: SiteContent;
  currentUser: AdminUser;
  onClose: () => void;
  onContentUpdated: (updated: SiteContent) => void;
}

type TabType = 'overview' | 'photos' | 'content' | 'audio' | 'theme' | 'firebase';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialContent,
  currentUser,
  onClose,
  onContentUpdated
}) => {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [responses, setResponses] = useState<ProposalResponseRecord[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    getProposalResponses().then((res) => {
      setResponses(res);
    });
  }, []);

  const handleCopyWebsiteLink = () => {
    const origin = window.location.origin;
    navigator.clipboard.writeText(origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleExportResponses = () => {
    if (responses.length === 0) {
      alert("No responses to export yet!");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(responses, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `haseena_proposal_responses_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearResponses = async () => {
    if (confirm("Are you sure you want to clear the logged test responses? This will reset the responses list for Haseena.")) {
      await clearProposalResponses();
      setResponses([]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await saveSiteContent(content);
      onContentUpdated(content);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to save website content:', err);
      alert('Error saving content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.hash = '';
    onClose();
  };

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'photos', label: '6 Photos Gallery', icon: ImageIcon },
    { id: 'content', label: 'Website Content', icon: Edit3 },
    { id: 'audio', label: 'Music & Audio', icon: Music },
    { id: 'theme', label: 'Design Theme', icon: Palette },
    { id: 'firebase', label: 'Firebase & Security', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-burgundy-950 text-ivory overflow-y-auto">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 bg-burgundy-900/90 backdrop-blur-xl border-b border-champagne/25 px-4 sm:px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-wine to-champagne/80 p-[1px] shadow-md">
              <div className="w-full h-full rounded-xl bg-burgundy-950 flex items-center justify-center">
                <Heart className="w-5 h-5 text-champagne fill-champagne/40" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-ivory">
                  A Little World Called Haseena
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-champagne/20 text-champagne text-[10px] font-mono uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-champagne/70 font-mono">
                Signed in as: <span className="text-ivory">{currentUser.email}</span>
                {' • '}
                <span className={isFirebaseConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                  {isFirebaseConfigured ? 'Firebase Active' : 'Local Preview Mode'}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-pulse">
                <CheckCircle className="w-4 h-4" />
                Changes Published!
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-wine to-champagne/80 hover:from-wine-light hover:to-champagne text-ivory text-xs uppercase tracking-wider font-mono font-medium shadow-lg hover:shadow-[0_0_20px_rgba(214,183,121,0.4)] transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Publishing...' : 'Save & Publish'}
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 border border-champagne/30 text-champagne hover:bg-wine/40 text-xs uppercase tracking-wider font-mono transition-all"
              title="Return to website view"
            >
              <Eye className="w-4 h-4" />
              <span>Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-burgundy-900/60 border border-champagne/20 text-champagne/60 hover:text-rose-400 hover:border-rose-400/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-champagne/15 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-mono transition-all shrink-0 ${
                  isActive
                    ? 'bg-wine text-champagne border border-champagne/60 shadow-lg'
                    : 'bg-burgundy-900/40 text-ivory/70 border border-champagne/10 hover:text-champagne hover:bg-burgundy-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Proposal Responses Card */}
              <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
                  <div className="flex items-center gap-2 text-champagne">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                    <h3 className="font-serif text-2xl text-ivory">
                      Haseena&apos;s Proposal Responses
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-burgundy-950 border border-champagne/30 text-champagne text-xs font-mono">
                    {responses.length} recorded
                  </span>
                </div>

                {responses.length === 0 ? (
                  <div className="py-12 text-center text-ivory/60 font-light">
                    <p className="font-serif text-lg">No response recorded yet.</p>
                    <p className="text-xs text-champagne/60 mt-1 font-mono">
                      When Haseena views the final proposal section and chooses an option, her answer will appear here with an exact timestamp!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {responses.map((res, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border flex items-center justify-between ${
                          res.choice === 'yes'
                            ? 'bg-wine/30 border-rose-500/40'
                            : 'bg-burgundy-950/80 border-champagne/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {res.choice === 'yes' ? '❤️' : '🤍'}
                          </span>
                          <div>
                            <p className="font-serif text-lg text-ivory">
                              {res.choice === 'yes'
                                ? 'She said: "I\'d love to"'
                                : 'She said: "I\'d like some time"'}
                            </p>
                            {res.note && (
                              <p className="text-sm text-champagne font-serif italic my-1 bg-burgundy-950/60 px-3 py-1.5 rounded-lg border border-champagne/20">
                                Note from Haseena: &ldquo;{res.note}&rdquo;
                              </p>
                            )}
                            <p className="text-xs text-champagne/70 font-mono">
                              {res.formattedDate || new Date(res.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-burgundy-950 border border-champagne/30 text-champagne">
                          {res.choice === 'yes' ? 'Affirmative ❤️' : 'Thoughtful 🤍'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Status Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-2xl bg-burgundy-900/60 border border-champagne/20">
                  <span className="text-[11px] font-mono text-champagne/70 uppercase">
                    Target Name
                  </span>
                  <p className="font-serif text-2xl text-ivory mt-1">
                    {content.general.targetName}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-burgundy-900/60 border border-champagne/20">
                  <span className="text-[11px] font-mono text-champagne/70 uppercase">
                    Gallery Photos
                  </span>
                  <p className="font-serif text-2xl text-ivory mt-1">
                    {content.photos.length} / 6 Slots Ready
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-burgundy-900/60 border border-champagne/20">
                  <span className="text-[11px] font-mono text-champagne/70 uppercase">
                    Music Player
                  </span>
                  <p className="font-serif text-2xl text-ivory mt-1">
                    {content.audio.enabled ? 'Active 🎵' : 'Muted'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-burgundy-900/60 border border-champagne/20">
                  <span className="text-[11px] font-mono text-champagne/70 uppercase">
                    Petal Density
                  </span>
                  <p className="font-serif text-2xl text-ivory mt-1">
                    {content.theme.petalCount} Petals Floating
                  </p>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <button
                  onClick={() => setActiveTab('photos')}
                  className="p-6 rounded-2xl bg-burgundy-900/40 border border-champagne/20 hover:border-champagne hover:bg-wine/30 transition-all text-left group"
                >
                  <ImageIcon className="w-7 h-7 text-champagne mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif text-xl text-ivory">Manage 6 Photos</h4>
                  <p className="text-xs text-champagne/70 mt-1 font-light">
                    Upload her photos, adjust captions, and arrange order.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne">
                    <span>Open photo manager</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className="p-6 rounded-2xl bg-burgundy-900/40 border border-champagne/20 hover:border-champagne hover:bg-wine/30 transition-all text-left group"
                >
                  <Edit3 className="w-7 h-7 text-champagne mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif text-xl text-ivory">Edit Love Letter & Story</h4>
                  <p className="text-xs text-champagne/70 mt-1 font-light">
                    Personalize the secret letter, 7 story moments, and proposal lines.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne">
                    <span>Open content editor</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('audio')}
                  className="p-6 rounded-2xl bg-burgundy-900/40 border border-champagne/20 hover:border-champagne hover:bg-wine/30 transition-all text-left group"
                >
                  <Music className="w-7 h-7 text-champagne mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif text-xl text-ivory">Upload Background Music</h4>
                  <p className="text-xs text-champagne/70 mt-1 font-light">
                    Upload an MP3 song or use the delicate romantic piano generator.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-mono text-champagne">
                    <span>Open music settings</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

            </div>
          )}

          {/* 6 PHOTOS GALLERY TAB */}
          {activeTab === 'photos' && (
            <PhotoManager
              photos={content.photos}
              onChange={(updatedPhotos) => setContent({ ...content, photos: updatedPhotos })}
            />
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <ContentEditor
              content={content}
              onChange={(updatedContent) => setContent(updatedContent)}
            />
          )}

          {/* AUDIO TAB */}
          {activeTab === 'audio' && (
            <AudioSettings
              audio={content.audio}
              onChange={(updatedAudio) => setContent({ ...content, audio: updatedAudio })}
            />
          )}

          {/* THEME TAB */}
          {activeTab === 'theme' && (
            <ThemeSettings
              theme={content.theme}
              onChange={(updatedTheme) => setContent({ ...content, theme: updatedTheme })}
            />
          )}

          {/* FIREBASE TAB */}
          {activeTab === 'firebase' && (
            <FirebaseSetupGuide />
          )}
        </div>

      </div>

    </div>
  );
};


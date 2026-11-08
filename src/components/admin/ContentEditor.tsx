import React from 'react';
import { SiteContent } from '../../types';
import { Edit3, Plus, Trash2, Heart, Sparkles, Mail, MessageSquare } from 'lucide-react';

interface ContentEditorProps {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ content, onChange }) => {
  const handleGeneralChange = (field: keyof SiteContent['general'], value: string) => {
    onChange({
      ...content,
      general: {
        ...content.general,
        [field]: value
      }
    });
  };

  const handleIntroChange = (field: keyof SiteContent['intro'], value: string) => {
    onChange({
      ...content,
      intro: {
        ...content.intro,
        [field]: value
      }
    });
  };

  const handleStorySentenceChange = (index: number, value: string) => {
    const updated = [...content.story.sentences];
    updated[index] = value;
    onChange({
      ...content,
      story: {
        ...content.story,
        sentences: updated
      }
    });
  };

  const handleAddStorySentence = () => {
    onChange({
      ...content,
      story: {
        ...content.story,
        sentences: [...content.story.sentences, "New romantic chapter..."]
      }
    });
  };

  const handleRemoveStorySentence = (index: number) => {
    if (content.story.sentences.length <= 1) return;
    const updated = content.story.sentences.filter((_, idx) => idx !== index);
    onChange({
      ...content,
      story: {
        ...content.story,
        sentences: updated
      }
    });
  };

  const handleLetterParagraphChange = (index: number, value: string) => {
    const updated = [...content.letter.paragraphs];
    updated[index] = value;
    onChange({
      ...content,
      letter: {
        ...content.letter,
        paragraphs: updated
      }
    });
  };

  const handleProposalChange = (field: keyof SiteContent['proposal'], value: string) => {
    onChange({
      ...content,
      proposal: {
        ...content.proposal,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-10">
      
      {/* General Settings */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-champagne border-b border-champagne/20 pb-3">
          <Sparkles className="w-5 h-5" />
          <h4 className="font-serif text-xl text-ivory">Identity & Hero Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Target Lady's Name (Hero Display)
            </label>
            <input
              type="text"
              value={content.general.targetName}
              onChange={(e) => handleGeneralChange('targetName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Website Title (Browser Tab)
            </label>
            <input
              type="text"
              value={content.general.websiteTitle}
              onChange={(e) => handleGeneralChange('websiteTitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={content.general.heroSubtitle}
              onChange={(e) => handleGeneralChange('heroSubtitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Introduction Gateway Quotes */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-champagne border-b border-champagne/20 pb-3">
          <Heart className="w-5 h-5" />
          <h4 className="font-serif text-xl text-ivory">Introduction Gateway Screen</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Opening Quote Line 1
            </label>
            <input
              type="text"
              value={content.intro.quoteLine1}
              onChange={(e) => handleIntroChange('quoteLine1', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Opening Quote Line 2
            </label>
            <input
              type="text"
              value={content.intro.quoteLine2}
              onChange={(e) => handleIntroChange('quoteLine2', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Enter CTA Button Text
            </label>
            <input
              type="text"
              value={content.intro.buttonText}
              onChange={(e) => handleIntroChange('buttonText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Our Little Story Sentences */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-champagne/20 pb-3">
          <div className="flex items-center gap-2 text-champagne">
            <MessageSquare className="w-5 h-5" />
            <h4 className="font-serif text-xl text-ivory">Our Little Story (Scrolling Storyline)</h4>
          </div>

          <button
            onClick={handleAddStorySentence}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy-950 border border-champagne/30 text-champagne hover:bg-wine text-xs font-mono"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Sentence
          </button>
        </div>

        <div className="space-y-3">
          {content.story.sentences.map((sentence, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-8 text-center text-xs font-mono text-champagne/60 shrink-0">
                0{idx + 1}
              </span>
              <input
                type="text"
                value={sentence}
                onChange={(e) => handleStorySentenceChange(idx, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
              <button
                onClick={() => handleRemoveStorySentence(idx)}
                className="p-2 text-champagne/40 hover:text-rose-400 transition-colors"
                title="Remove sentence"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* The Secret Letter */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-champagne border-b border-champagne/20 pb-3">
          <Mail className="w-5 h-5" />
          <h4 className="font-serif text-xl text-ivory">The Secret Letter Content</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Letter Heading
            </label>
            <input
              type="text"
              value={content.letter.heading}
              onChange={(e) =>
                onChange({ ...content, letter: { ...content.letter, heading: e.target.value } })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Salutation / Recipient
            </label>
            <input
              type="text"
              value={content.letter.recipient}
              onChange={(e) =>
                onChange({ ...content, letter: { ...content.letter, recipient: e.target.value } })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono">
            Letter Body Paragraphs
          </label>
          {content.letter.paragraphs.map((p, idx) => (
            <textarea
              key={idx}
              rows={2}
              value={p}
              onChange={(e) => handleLetterParagraphChange(idx, e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Sign-off Note
            </label>
            <input
              type="text"
              value={content.letter.signoff}
              onChange={(e) =>
                onChange({ ...content, letter: { ...content.letter, signoff: e.target.value } })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Sender Signature
            </label>
            <input
              type="text"
              value={content.letter.sender}
              onChange={(e) =>
                onChange({ ...content, letter: { ...content.letter, sender: e.target.value } })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Proposal Final Surprise */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-champagne border-b border-champagne/20 pb-3">
          <Heart className="w-5 h-5 text-rose-400" />
          <h4 className="font-serif text-xl text-ivory">The Proposal & Responses</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              First Prelude Message
            </label>
            <input
              type="text"
              value={content.proposal.prelude}
              onChange={(e) => handleProposalChange('prelude', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Main Proposal Question
            </label>
            <textarea
              rows={2}
              value={content.proposal.question}
              onChange={(e) => handleProposalChange('question', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
                Yes Button Text
              </label>
              <input
                type="text"
                value={content.proposal.yesButtonText}
                onChange={(e) => handleProposalChange('yesButtonText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
                Need Time Button Text
              </label>
              <input
                type="text"
                value={content.proposal.noButtonText}
                onChange={(e) => handleProposalChange('noButtonText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
                Yes Response Message
              </label>
              <textarea
                rows={2}
                value={content.proposal.yesResponse}
                onChange={(e) => handleProposalChange('yesResponse', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
                Need Time Response Message
              </label>
              <textarea
                rows={2}
                value={content.proposal.noResponse}
                onChange={(e) => handleProposalChange('noResponse', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

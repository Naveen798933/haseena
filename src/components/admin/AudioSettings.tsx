import React, { useState } from 'react';
import { SiteContent } from '../../types';
import { uploadMusic } from '../../firebase/services';
import { Music, Upload, Play, Pause, Check, Volume2 } from 'lucide-react';

interface AudioSettingsProps {
  audio: SiteContent['audio'];
  onChange: (audio: SiteContent['audio']) => void;
}

export const AudioSettings: React.FC<AudioSettingsProps> = ({ audio, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.endsWith('.mp3')) {
      alert('Please upload a valid audio file (.mp3, .m4a, .wav)');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setStatusMessage('Uploading romantic music file...');

    try {
      const downloadUrl = await uploadMusic(file, (progress) => {
        setUploadProgress(progress);
      });

      onChange({
        ...audio,
        musicUrl: downloadUrl,
        title: file.name.replace(/\.[^/.]+$/, "")
      });

      setStatusMessage('Audio file successfully uploaded and set!');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Audio upload failed:', err);
      setStatusMessage('Audio upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const toggleTestPlay = () => {
    if (isPlayingPreview) {
      if (previewAudio) {
        previewAudio.pause();
      }
      setIsPlayingPreview(false);
    } else {
      if (audio.musicUrl) {
        const aud = new Audio(audio.musicUrl);
        aud.onended = () => setIsPlayingPreview(false);
        aud.play().then(() => {
          setPreviewAudio(aud);
          setIsPlayingPreview(true);
        }).catch(() => {
          alert("Could not play audio URL.");
        });
      } else {
        alert("Playing synthesized Web Audio romantic piano when no MP3 is uploaded.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
          <div className="flex items-center gap-2 text-champagne">
            <Music className="w-5 h-5" />
            <h4 className="font-serif text-xl text-ivory">Background Music Configuration</h4>
          </div>

          {/* Master Enable Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={audio.enabled}
              onChange={(e) => onChange({ ...audio, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-burgundy-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-champagne after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-champagne/60 peer-checked:after:bg-champagne after:border-champagne/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wine border border-champagne/40"></div>
            <span className="ml-3 text-xs uppercase tracking-wider font-mono text-champagne">
              {audio.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-wine/40 border border-champagne/40 text-champagne text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Track Title
            </label>
            <input
              type="text"
              value={audio.title}
              onChange={(e) => onChange({ ...audio, title: e.target.value })}
              placeholder="Nocturne in Champagne & Rose"
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Artist / Performer
            </label>
            <input
              type="text"
              value={audio.artist}
              onChange={(e) => onChange({ ...audio, artist: e.target.value })}
              placeholder="Romantic Piano Solo"
              className="w-full px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-1.5">
              Direct Audio File URL (MP3 / M4A)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={audio.musicUrl}
                onChange={(e) => onChange({ ...audio, musicUrl: e.target.value })}
                placeholder="Leave blank to use the built-in romantic Web Audio piano synthesizer"
                className="flex-1 px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory text-sm focus:border-champagne focus:outline-none"
              />
              {audio.musicUrl && (
                <button
                  type="button"
                  onClick={toggleTestPlay}
                  className="px-4 py-2.5 rounded-xl bg-burgundy-950 border border-champagne/40 text-champagne hover:bg-wine text-xs font-mono inline-flex items-center gap-1.5"
                >
                  {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingPreview ? 'Stop' : 'Test'}</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-champagne/60 mt-1 font-mono">
              Note: When empty, an ultra-soft romantic piano nocturne synthesizes automatically via Web Audio!
            </p>
          </div>
        </div>

        {/* Upload Audio Dropzone */}
        <div className="pt-4 border-t border-champagne/15">
          <label className="block text-xs uppercase tracking-wider text-champagne/80 font-mono mb-2">
            Upload Custom Music File (MP3)
          </label>
          <div className="relative border-2 border-dashed border-champagne/30 rounded-2xl p-6 text-center hover:border-champagne hover:bg-wine/20 transition-all cursor-pointer">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="w-8 h-8 text-champagne" />
              <p className="text-sm font-serif text-ivory">
                Click to browse and upload an audio file
              </p>
              <p className="text-xs text-champagne/60 font-mono">
                Supports MP3, M4A, WAV up to 25MB
              </p>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4 p-4 rounded-xl bg-burgundy-950 border border-champagne/30">
              <div className="w-full bg-burgundy-900 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-champagne h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-champagne">
                Uploading audio: {uploadProgress}%
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


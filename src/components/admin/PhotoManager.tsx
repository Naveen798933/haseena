import React, { useState } from 'react';
import { PhotoItem } from '../../types';
import { uploadPhoto } from '../../firebase/services';
import { Upload, ArrowUp, ArrowDown, Image as ImageIcon, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { DEFAULT_CONTENT } from '../../data/defaultContent';

interface PhotoManagerProps {
  photos: PhotoItem[];
  onChange: (photos: PhotoItem[]) => void;
}

export const PhotoManager: React.FC<PhotoManagerProps> = ({ photos, onChange }) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Guarantee 6 slots
  const currentPhotos = [...photos];
  while (currentPhotos.length < 6) {
    const nextIdx = currentPhotos.length + 1;
    currentPhotos.push({
      id: `photo-${nextIdx}`,
      order: nextIdx,
      caption: `0${nextIdx} — A beautiful moment.`,
      subtitle: 'Cherished memories',
      url: DEFAULT_CONTENT.photos[nextIdx - 1]?.url || 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1200&auto=format&fit=crop'
    });
  }

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    setUploadingIndex(index);
    setUploadProgress(10);
    setStatusMessage(`Uploading slot 0${index + 1}...`);

    try {
      const downloadUrl = await uploadPhoto(file, `slot_${index + 1}`, (progress) => {
        setUploadProgress(progress);
      });

      const updated = [...currentPhotos];
      updated[index] = {
        ...updated[index],
        url: downloadUrl
      };

      onChange(updated);
      setStatusMessage(`Slot 0${index + 1} updated successfully!`);
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('Failed to upload photo:', err);
      setStatusMessage('Upload failed. Please try again.');
    } finally {
      setUploadingIndex(null);
      setUploadProgress(0);
    }
  };

  const handleCaptionChange = (index: number, field: 'caption' | 'subtitle', val: string) => {
    const updated = [...currentPhotos];
    updated[index] = {
      ...updated[index],
      [field]: val
    };
    onChange(updated);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= currentPhotos.length) return;
    const updated = [...currentPhotos];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    
    // update order field
    const reordered = updated.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));

    onChange(reordered);
  };

  const handleResetToPlaceholders = () => {
    if (confirm("Reset all 6 slots to the elegant default aesthetic placeholders?")) {
      onChange(DEFAULT_CONTENT.photos);
      setStatusMessage("Reset to default placeholders.");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-burgundy-950/70 border border-champagne/20">
        <div>
          <h3 className="font-serif text-2xl text-ivory font-light">
            Six Personal Photographs Manager
          </h3>
          <p className="text-xs text-champagne/70 font-mono mt-0.5">
            Manage, upload, reorder, and caption all 6 photo slots for Haseena.
          </p>
        </div>

        <button
          onClick={handleResetToPlaceholders}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-burgundy-900 border border-champagne/30 text-champagne hover:bg-wine/40 text-xs uppercase tracking-wider font-mono transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset to Placeholders
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-wine/40 border border-champagne/40 text-champagne text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Grid of 6 Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPhotos.slice(0, 6).map((photo, index) => {
          const isUploading = uploadingIndex === index;

          return (
            <div
              key={photo.id || index}
              className="rounded-2xl bg-burgundy-900/60 border border-champagne/30 p-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Photo Header & Reorder Controls */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-burgundy-950 border border-champagne/40 text-champagne text-xs font-mono font-bold">
                    Slot 0{index + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(index, index - 1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-burgundy-950 hover:bg-wine text-champagne/80 hover:text-champagne disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, index + 1)}
                      disabled={index === 5}
                      className="p-1.5 rounded-lg bg-burgundy-950 hover:bg-wine text-champagne/80 hover:text-champagne disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Preview & Upload Dropzone */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-burgundy-950 border border-champagne/20 group mb-4">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />

                  {/* Upload Overlay */}
                  <label className="absolute inset-0 bg-burgundy-950/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                    <Upload className="w-6 h-6 text-champagne mb-1" />
                    <span className="text-xs font-mono uppercase tracking-wider text-ivory">
                      Click to Replace Photo
                    </span>
                    <span className="text-[10px] text-champagne/70 mt-1">
                      JPG, PNG, WEBP (Up to 15MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(index, e)}
                      className="hidden"
                    />
                  </label>

                  {/* Upload Progress Indicator */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-burgundy-950/90 flex flex-col items-center justify-center p-4">
                      <div className="w-full bg-burgundy-800 rounded-full h-2 mb-2 overflow-hidden border border-champagne/30">
                        <div
                          className="bg-champagne h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-champagne">
                        Uploading {uploadProgress}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Edit Caption */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-champagne/80 font-mono mb-1">
                      Caption Title
                    </label>
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => handleCaptionChange(index, 'caption', e.target.value)}
                      placeholder="01 — A beautiful smile."
                      className="w-full px-3 py-2 rounded-lg bg-burgundy-950 border border-champagne/30 text-ivory text-xs focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-champagne/80 font-mono mb-1">
                      Subtitle / Emotional Note
                    </label>
                    <input
                      type="text"
                      value={photo.subtitle || ''}
                      onChange={(e) => handleCaptionChange(index, 'subtitle', e.target.value)}
                      placeholder="A radiance that brightens any room"
                      className="w-full px-3 py-2 rounded-lg bg-burgundy-950 border border-champagne/30 text-ivory text-xs focus:border-champagne focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Direct File input button */}
              <div className="mt-4 pt-3 border-t border-champagne/15 flex justify-end">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-wine/50 hover:bg-wine text-champagne text-xs font-mono cursor-pointer transition-colors">
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(index, e)}
                    className="hidden"
                  />
                </label>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

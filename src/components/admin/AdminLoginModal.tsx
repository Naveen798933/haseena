import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Key, X, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { loginAdmin } from '../../firebase/services';
import { isFirebaseConfigured } from '../../firebase/config';
import { AdminUser } from '../../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await loginAdmin(email, password);
      onLoginSuccess(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@haseena.love');
    setPassword('secretlove123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-3xl bg-burgundy-900 border border-champagne/40 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-ivory"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-wine/40 text-champagne/70 hover:text-champagne transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-wine to-champagne/80 p-[1px] mb-6 mx-auto shadow-lg">
          <div className="w-full h-full rounded-2xl bg-burgundy-950 flex items-center justify-center">
            <Lock className="w-6 h-6 text-champagne" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl text-ivory font-light tracking-wide">
            Admin Authentication
          </h2>
          <p className="text-xs text-champagne/70 mt-1 uppercase tracking-widest font-mono">
            Management Portal for Haseena
          </p>
        </div>

        {/* Firebase status banner */}
        <div className="mb-6 p-3 rounded-xl bg-burgundy-950/70 border border-champagne/20 text-xs flex items-center gap-2">
          {isFirebaseConfigured ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-300">
                Connected to real Firebase Auth & Firestore.
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-champagne shrink-0" />
              <span className="text-champagne/90">
                Firebase keys not set in .env. Running in Demo / Local Admin mode.
              </span>
            </>
          )}
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-champagne/80 font-mono mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-champagne/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@haseena.love"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory placeholder-champagne/30 text-sm focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-champagne/80 font-mono mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-champagne/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-burgundy-950 border border-champagne/30 text-ivory placeholder-champagne/30 text-sm focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-wine to-champagne/80 hover:from-wine-light hover:to-champagne text-ivory font-serif tracking-wider text-base font-medium shadow-lg hover:shadow-[0_0_25px_rgba(214,183,121,0.4)] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In as Administrator'}
          </button>
        </form>

        {!isFirebaseConfigured && (
          <div className="mt-6 pt-4 border-t border-champagne/20 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-champagne/80 hover:text-champagne underline underline-offset-4 flex items-center justify-center gap-1 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fill Demo Admin Credentials
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};

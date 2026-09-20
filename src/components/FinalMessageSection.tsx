import React, { useState } from 'react';
import { ForgivenessStatus } from '../types';
import { Heart, Clock, MessageCircleHeart, Send, Check } from 'lucide-react';

interface FinalMessageSectionProps {
  isDarkMode: boolean;
}

const RESPONSE_STORAGE_KEY = 'sanidhya_forgiveness_status_v1';
const NOTE_STORAGE_KEY = 'sanidhya_note_to_husband_v1';

export const FinalMessageSection: React.FC<FinalMessageSectionProps> = ({ isDarkMode }) => {
  const [status, setStatus] = useState<ForgivenessStatus>(() => {
    try {
      const saved = localStorage.getItem(RESPONSE_STORAGE_KEY);
      if (saved === 'forgiven' || saved === 'needs_time') return saved;
    } catch {
      // Ignore
    }
    return 'pending';
  });

  const [personalNote, setPersonalNote] = useState(() => {
    try {
      return localStorage.getItem(NOTE_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [isNoteSent, setIsNoteSent] = useState(false);

  const handleSelectStatus = (newStatus: ForgivenessStatus) => {
    setStatus(newStatus);
    try {
      localStorage.setItem(RESPONSE_STORAGE_KEY, newStatus);
    } catch {
      // Ignore
    }
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalNote.trim()) return;
    try {
      localStorage.setItem(NOTE_STORAGE_KEY, personalNote);
      setIsNoteSent(true);
      setTimeout(() => setIsNoteSent(false), 4000);
    } catch {
      // Ignore
    }
  };

  return (
    <section
      id="section-final-message"
      className="py-16 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto relative z-10"
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-6">
        {/* Big Emotional Text as requested */}
        <h2
          className={`font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-snug ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          “Sanidhya, mujhe pata hai sirf ‘sorry’ bolne se sab theek nahi hota. But I really mean it.{' '}
          <span className="text-rose-500">❤️</span>”
        </h2>

        {/* The Question */}
        <p
          className={`font-serif-romantic text-2xl sm:text-3xl font-semibold italic text-rose-500 pt-2`}
        >
          “Mujhe maaf kar do? 🥺”
        </p>

        {/* Interactive Response Options */}
        {status === 'pending' && (
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="btn-forgive-yes"
              type="button"
              onClick={() => handleSelectStatus('forgiven')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-medium text-white text-base sm:text-lg shadow-lg hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-rose-500 to-red-500"
            >
              <span>Yes</span>
              <span className="text-xl">❤️</span>
            </button>

            <button
              id="btn-forgive-needs-time"
              type="button"
              onClick={() => handleSelectStatus('needs_time')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-medium text-base sm:text-lg border transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? 'bg-stone-800/90 border-stone-700 text-stone-200 hover:bg-stone-700/80 shadow-md'
                  : 'bg-white border-rose-200 text-stone-700 hover:bg-rose-50/60 shadow-sm'
              }`}
            >
              <span>Thoda Time Chahiye</span>
              <span className="text-xl">🤍</span>
            </button>
          </div>
        )}

        {/* State: If she clicks "Yes ❤️" */}
        {status === 'forgiven' && (
          <div
            id="response-yes-container"
            className={`mt-8 p-8 sm:p-10 rounded-2xl border text-center space-y-4 animate-in fade-in duration-500 ${
              isDarkMode
                ? 'bg-stone-900/90 border-rose-900/60 text-stone-200'
                : 'bg-white/95 border-rose-200 text-stone-800 shadow-xl shadow-rose-950/5'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-3xl mb-2">
              ❤️
            </div>

            <h3 className="font-serif-romantic text-2xl sm:text-3xl font-medium text-rose-600">
              “Thank you meri jaan ❤️ Ab gussa nahi, sirf pyaar.”
            </h3>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-lg mx-auto ${
                isDarkMode ? 'text-stone-300' : 'text-stone-600'
              }`}
            >
              Tumhare is badappan aur pyaar ke liye main zindagi bhar shukraguzar
              rahunga. Main apna promise kabhi nahi todunga. Tum meri jaan ho,
              aur meri har saans me tumhara pyaar hai.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSelectStatus('pending')}
                className="text-xs text-stone-400 hover:text-rose-500 underline transition-colors"
              >
                Change response
              </button>
            </div>
          </div>
        )}

        {/* State: If she clicks "Thoda Time Chahiye 🤍" */}
        {status === 'needs_time' && (
          <div
            id="response-time-container"
            className={`mt-8 p-8 sm:p-10 rounded-2xl border text-center space-y-4 animate-in fade-in duration-500 ${
              isDarkMode
                ? 'bg-stone-900/90 border-stone-800 text-stone-200'
                : 'bg-white/95 border-stone-200 text-stone-800 shadow-xl'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-600 text-3xl mb-2">
              🤍
            </div>

            <h3 className="font-serif-romantic text-2xl sm:text-3xl font-medium text-stone-800 dark:text-stone-100">
              “Take your time. Main yahin hoon.{' '}
              <span className="text-rose-500">❤️</span>”
            </h3>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-lg mx-auto ${
                isDarkMode ? 'text-stone-300' : 'text-stone-600'
              }`}
            >
              Mujhe poora aitraaz nahi hai. Tumhe hurt hua hai aur tumhe apna
              samay lene ka poora haq hai. Koi zabardasti nahi, koi jaldi nahi.
              Main chupchap, bina kisi shikayat ke tumhara wait karunga. Jab bhi
              tumhara dil chahe, main yahin khada hoon.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSelectStatus('pending')}
                className="text-xs text-stone-400 hover:text-rose-500 underline transition-colors"
              >
                Change response
              </button>
            </div>
          </div>
        )}

        {/* Optional heartfelt note from Sanidhya to her husband */}
        <div
          className={`mt-10 p-6 rounded-xl border text-left ${
            isDarkMode
              ? 'bg-stone-900/40 border-stone-800'
              : 'bg-rose-50/40 border-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-rose-500 font-semibold mb-2">
            <MessageCircleHeart className="w-4 h-4" />
            <span>Leave A Note For Your Husband (Saved Privately)</span>
          </div>

          <form onSubmit={handleSendNote} className="space-y-3">
            <textarea
              rows={2}
              placeholder="Sanidhya, if you want to say something back to him..."
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-100'
                  : 'bg-white border-rose-200 text-stone-800'
              }`}
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                {isNoteSent ? 'Your note is saved with love ❤️' : 'Saved only on this device'}
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 text-white text-xs font-medium hover:bg-rose-600 transition-colors shadow-sm"
              >
                {isNoteSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isNoteSent ? 'Saved' : 'Save Note'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

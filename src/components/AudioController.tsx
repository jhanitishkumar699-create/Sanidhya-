import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface AudioControllerProps {
  isDarkMode: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isDarkMode }) => {
  const [audioState, setAudioState] = useState(romanticAudio.getState());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe(() => {
      setAudioState(romanticAudio.getState());
    });
    return unsubscribe;
  }, []);

  return (
    <div
      id="audio-controller-widget"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
    >
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-stone-900/80 border-rose-900/40 text-stone-200'
            : 'bg-white/85 border-rose-200/70 text-stone-700 shadow-rose-950/5'
        }`}
      >
        {/* Play / Pause Melody */}
        <button
          id="btn-audio-play-toggle"
          type="button"
          onClick={() => romanticAudio.togglePlay()}
          className={`flex items-center gap-2 text-xs font-medium tracking-wide transition-all ${
            audioState.isPlaying ? 'text-rose-500' : 'text-stone-400 hover:text-rose-500'
          }`}
          title={audioState.isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        >
          {audioState.isPlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <Pause className="w-3.5 h-3.5 text-rose-500" />
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5" />
              <Play className="w-3.5 h-3.5" />
            </>
          )}
          <span className="hidden sm:inline">
            {audioState.isPlaying ? 'Melody Playing' : 'Play Music'}
          </span>
        </button>

        <div className={`h-3.5 w-px ${isDarkMode ? 'bg-stone-700' : 'bg-rose-200'}`} />

        {/* Volume controls */}
        <div className="relative flex items-center">
          <button
            id="btn-audio-mute-toggle"
            type="button"
            onClick={() => romanticAudio.toggleMute()}
            onMouseEnter={() => setShowVolumeSlider(true)}
            className="p-1 rounded-full text-stone-400 hover:text-rose-500 transition-colors"
            title={audioState.isMuted ? 'Unmute' : 'Mute'}
          >
            {audioState.isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {showVolumeSlider && (
            <div
              onMouseLeave={() => setShowVolumeSlider(false)}
              className={`absolute bottom-8 right-0 p-2.5 rounded-xl border backdrop-blur-md shadow-xl flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-stone-900/95 border-rose-900/50'
                  : 'bg-white/95 border-rose-200'
              }`}
            >
              <input
                id="audio-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.isMuted ? 0 : audioState.volume}
                onChange={(e) => {
                  romanticAudio.setVolume(parseFloat(e.target.value));
                  if (audioState.isMuted) romanticAudio.toggleMute();
                }}
                className="w-20 accent-rose-500 cursor-pointer h-1.5 bg-rose-100 rounded-lg appearance-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

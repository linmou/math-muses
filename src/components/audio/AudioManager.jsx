import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const AudioContext = createContext();

// Sound effect URLs - Classical piano notes
const SOUNDS = {
  click: 'https://cdn.freesound.org/previews/428/428156_3248244-lq.mp3',
  success: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3',
  error: 'https://cdn.freesound.org/previews/330/330388_4766646-lq.mp3',
  hint: 'https://cdn.freesound.org/previews/428/428155_3248244-lq.mp3',
  flower: 'https://cdn.freesound.org/previews/456/456965_5674468-lq.mp3',
  celebration: 'https://cdn.freesound.org/previews/398/398031_5260872-lq.mp3',
  casual: 'https://cdn.freesound.org/previews/573/573505_6047207-lq.mp3',
  peaceful: 'https://cdn.freesound.org/previews/426/426166_6279191-lq.mp3',
  joyful: 'https://cdn.freesound.org/previews/400/400953_7180975-lq.mp3'
};

const MUSIC_TRACKS = {
  home: 'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3',
  studio: 'https://www.bensound.com/bensound-music/bensound-sweetmusic.mp3',
  puzzle: 'https://www.bensound.com/bensound-music/bensound-clearday.mp3',
  garden: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
  joyful: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
  peaceful: 'https://www.bensound.com/bensound-music/bensound-dreams.mp3',
  girlish: 'https://www.bensound.com/bensound-music/bensound-littleidea.mp3'
};

export function AudioProvider({ children, settings = {} }) {
  const [musicEnabled, setMusicEnabled] = useState(settings.music_enabled ?? true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(settings.sound_effects_enabled ?? true);
  const [volume, setVolume] = useState(settings.volume ?? 0.7);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  const musicRef = useRef(null);
  const soundRefs = useRef({});

  // Initialize audio elements
  useEffect(() => {
    musicRef.current = new Audio();
    musicRef.current.loop = true;
    musicRef.current.volume = volume * 0.3; // Background music is quieter
    
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume * 0.3;
    }
  }, [volume]);

  // Play background music
  const playMusic = (trackName) => {
    if (!musicEnabled || !musicRef.current || !MUSIC_TRACKS[trackName]) return;
    
    if (currentTrack === trackName) return;
    
    musicRef.current.src = MUSIC_TRACKS[trackName];
    musicRef.current.play().catch(err => console.log('Music autoplay prevented:', err));
    setCurrentTrack(trackName);
  };

  // Stop background music
  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      setCurrentTrack(null);
    }
  };

  // Play sound effect
  const playSound = (soundName) => {
    if (!soundEffectsEnabled || !SOUNDS[soundName]) return;
    
    const audio = new Audio(SOUNDS[soundName]);
    audio.volume = volume;
    audio.play().catch(err => console.log('Sound effect error:', err));
  };

  // Toggle music
  useEffect(() => {
    if (!musicEnabled && musicRef.current) {
      musicRef.current.pause();
    } else if (musicEnabled && currentTrack && musicRef.current) {
      musicRef.current.play().catch(err => console.log('Music play error:', err));
    }
  }, [musicEnabled, currentTrack]);

  const value = {
    musicEnabled,
    soundEffectsEnabled,
    volume,
    setMusicEnabled,
    setSoundEffectsEnabled,
    setVolume,
    playMusic,
    stopMusic,
    playSound
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
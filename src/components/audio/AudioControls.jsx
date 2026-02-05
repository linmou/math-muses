import React from 'react';
import { Volume2, VolumeX, Music, Volume1 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { useAudio } from './AudioManager';

export default function AudioControls({ onSettingsChange }) {
  const { 
    musicEnabled, 
    soundEffectsEnabled, 
    volume, 
    setMusicEnabled, 
    setSoundEffectsEnabled, 
    setVolume,
    playSound
  } = useAudio();

  const handleMusicToggle = () => {
    const newValue = !musicEnabled;
    setMusicEnabled(newValue);
    if (onSettingsChange) {
      onSettingsChange({ music_enabled: newValue });
    }
    playSound('click');
  };

  const handleSoundToggle = () => {
    const newValue = !soundEffectsEnabled;
    setSoundEffectsEnabled(newValue);
    if (onSettingsChange) {
      onSettingsChange({ sound_effects_enabled: newValue });
    }
    if (newValue) {
      playSound('click');
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value[0]);
    if (onSettingsChange) {
      onSettingsChange({ volume: value[0] });
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full hover:bg-white/50"
        >
          <VolumeIcon className="w-5 h-5 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm">Audio Settings</h3>
          
          {/* Music Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">Background Music</span>
            </div>
            <button
              onClick={handleMusicToggle}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                musicEnabled ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  musicEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-700">Sound Effects</span>
            </div>
            <button
              onClick={handleSoundToggle}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                soundEffectsEnabled ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEffectsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Volume</span>
              <span className="text-xs text-gray-500">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
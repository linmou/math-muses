import React from 'react';
import { AudioProvider } from './components/audio/AudioManager';
import AudioControls from './components/audio/AudioControls';

export default function Layout({ children, currentPageName }) {
  const fontFamilies = {
    inter: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    comic: 'Comic Sans MS, cursive, sans-serif',
    serif: 'Georgia, Times New Roman, serif',
    dyslexic: 'Arial, Helvetica, sans-serif'
  };

  const textSizes = {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px'
  };

  const fontFamily = fontFamilies.inter;
  const fontSize = textSizes.medium;
  const highContrast = false;
  const reducedMotion = false;

  const audioSettings = {
    music_enabled: true,
    sound_effects_enabled: true,
    volume: 0.7
  };

  return (
    <AudioProvider settings={audioSettings}>
      <div className="min-h-screen">
        {/* Global Controls - Fixed Position */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <AudioControls />
        </div>
        
        <style>{`
        :root {
          --color-primary: #a78bfa;
          --color-secondary: #f472b6;
          --color-accent: #fbbf24;
          --base-font-size: ${fontSize};
        }
        
        * {
          font-family: ${fontFamily};
          ${reducedMotion ? 'animation-duration: 0.01ms !important; transition-duration: 0.01ms !important;' : ''}
        }

        body {
          font-size: var(--base-font-size);
        }

        ${highContrast ? `
          * {
            filter: contrast(1.2);
          }
          .text-gray-500, .text-gray-600 {
            color: #000 !important;
          }
          .bg-white {
            background-color: #fff !important;
          }
        ` : ''}
        
        .font-serif {
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f3e8ff;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #c4b5fd, #f0abfc);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a78bfa, #e879f9);
        }
        
        /* Smooth animations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Selection color */
        ::selection {
          background: #f0abfc;
          color: white;
        }
      `}</style>
      
        {children}
      </div>
    </AudioProvider>
  );
}

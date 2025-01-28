



// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Gift, Music2, BellRing as RingIcon, Stars, Volume2, VolumeX } from 'lucide-react';
// Import the audio file - make sure to add the file in this location
import audioFile from './assets/perfect.mp3';
import coupleImage from './assets/couple.jpg'; // Update 'couple.jpg' to your actual image filename
function App() {
const [isOpen, setIsOpen] = useState(false);
const [showMessage, setShowMessage] = useState(false);
const [showProposal, setShowProposal] = useState(false);
const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
const [isMuted, setIsMuted] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);
const audioRef = useRef<HTMLAudioElement>(null);

useEffect(() => {
  if (isOpen && audioRef.current) {
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio autoplay failed:', error);
      }
    };
    playAudio();
  }
}, [isOpen]);

useEffect(() => {
  if (isOpen) {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    const proposalTimer = setTimeout(() => {
      setShowProposal(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(proposalTimer);
    };
  }
}, [isOpen]);

const toggleMute = () => {
  if (audioRef.current) {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  }
};

const moveNoButton = () => {
  if (containerRef.current) {
    const container = containerRef.current.getBoundingClientRect();
    const newX = Math.random() * (container.width - 100);
    const newY = Math.random() * (container.height - 40);
    setNoButtonPosition({ x: newX, y: newY });
  }
};

const handleYesClick = () => {
  alert('💍 She said YES! 🎉 Congratulations on your engagement! 💑');
};

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-200 flex items-center justify-center p-4">
    <audio
      ref={audioRef}
      src={audioFile}
      loop
    />
    <div 
      ref={containerRef}
      className={`relative max-w-md w-full transition-transform duration-1000 transform ${
        isOpen ? 'scale-100' : 'scale-95'
      }`}
    >
      {isOpen && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-gray-600" />
          ) : (
            <Volume2 className="w-6 h-6 text-gray-600" />
          )}
        </button>
      )}
      <div 
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 ${
          isOpen ? 'h-[700px]' : 'h-[200px] cursor-pointer hover:shadow-3xl'
        }`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* Card Cover */}
        <div className={`relative h-full transition-opacity duration-500 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50">
            <div className="text-center">
              <Heart className="w-16 h-16 text-pink-500 mx-auto animate-pulse" />
              <p className="mt-4 text-2xl font-semibold text-gray-800">Click to Open ❤️</p>
            </div>
          </div>
        </div>

        {/* Card Inside */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="h-full flex flex-col">
            {/* Photo Section */}
            <div className="relative h-72">
            <img 
  src={coupleImage} 
  alt="Romantic Photo" 
  className="w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Stars className="w-6 h-6 text-yellow-300 animate-spin" />
                <Stars className="w-6 h-6 text-pink-300 animate-spin" />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 text-center bg-gradient-to-b from-white to-pink-50">
              <div className="flex justify-center gap-4 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
                <Gift className="w-6 h-6 text-pink-500 animate-bounce delay-100" />
                <Music2 className="w-6 h-6 text-purple-500 animate-bounce delay-200" />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Happy Birthday My Love😘😘😘😘😘
              </h1>

              <div className={`transition-opacity duration-1000 ${
                showMessage ? 'opacity-100' : 'opacity-0'
              }`}>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  To the most amazing girlfriend in the world,<br />
                  Every moment with you feels like a celebration.<br />
                  You make my life brighter just by being in it.<br />
                  I hope your day is as special as you are to me.<br />
                  I love you soooo much meri Dikshu Babyyy😘😘😘😘 .<br />
                </p>

                {/* Proposal Section */}
                <div className={`transition-all duration-1000 ${
                  showProposal ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}>
                  <div className="relative bg-gradient-to-r from-pink-100 via-red-50 to-pink-100 p-6 rounded-xl shadow-inner mt-4">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <RingIcon className="w-12 h-12 text-pink-500 animate-bounce" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-6">
                      Will You Marry Me?
                    </h2>
                    
                    <div className="flex justify-center gap-6 mt-4">
                      <button
                        onClick={handleYesClick}
                        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Yes! 💍
                      </button>
                      
                      <button
                        style={{
                          position: 'absolute',
                          left: `${noButtonPosition.x}px`,
                          top: `${noButtonPosition.y}px`,
                          transition: 'all 0.2s ease-out'
                        }}
                        onMouseEnter={moveNoButton}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-semibold text-lg"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default App;
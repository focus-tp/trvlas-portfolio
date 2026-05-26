import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state on model source change
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play failed, standard browser restrictions:", err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekValue = parseFloat(e.target.value);
    audio.currentTime = seekValue;
    setCurrentTime(seekValue);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    setVolume(vol);
    if (vol > 0 && isMuted) {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="absolute inset-0 bg-bg-heavy/90 backdrop-blur-md flex flex-col justify-between p-6 text-text-main transition-all duration-350 select-none">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 bg-violet/30 border border-violet-light/30 rounded-xl ${isPlaying ? 'shadow-[0_0_15px_rgba(155,93,229,0.3)]' : ''}`}>
            <Music size={18} className="text-violet-light" />
          </div>
          <div className="min-w-0">
            <span className="text-[0.68rem] uppercase tracking-widest text-cyan font-bold block">Студийный AI вокал</span>
            <p className="text-sm font-bold text-text-main truncate max-w-[170px] mt-0.5">{title}</p>
          </div>
        </div>
        
        {/* Audio Wave Visualizer */}
        <div className="flex items-end gap-1.5 h-6 w-9 justify-center origin-bottom">
          <span className={`w-1 bg-cyan rounded-full origin-bottom ${isPlaying ? 'animate-wave-1' : 'h-1.5'}`} style={{ height: isPlaying ? '100%' : '6px' }} />
          <span className={`w-1 bg-violet-light rounded-full origin-bottom ${isPlaying ? 'animate-wave-2 animate-delay-150' : 'h-3'}`} style={{ height: isPlaying ? '100%' : '12px' }} />
          <span className={`w-1 bg-pink rounded-full origin-bottom ${isPlaying ? 'animate-wave-3 animate-delay-300' : 'h-2'}`} style={{ height: isPlaying ? '100%' : '8px' }} />
          <span className={`w-1 bg-cyan rounded-full origin-bottom ${isPlaying ? 'animate-wave-4 animate-delay-75' : 'h-1'}`} style={{ height: isPlaying ? '100%' : '4px' }} />
        </div>
      </div>

      {/* Control Button */}
      <div className="flex flex-col items-center justify-center py-2">
        <button
          onClick={togglePlay}
          id={`play-btn-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          className="w-16 h-16 rounded-full bg-linear-to-br from-violet to-violet-light text-white flex items-center justify-center shadow-[0_0_20px_rgba(155,93,229,0.45)] hover:shadow-[0_0_35px_rgba(155,93,229,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>
      </div>

      {/* Seek & Duration Controls */}
      <div className="space-y-3 pb-1">
        <div className="flex items-center gap-3 text-[0.75rem] font-mono text-muted">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-cyan bg-border-accent/40 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span>{duration > 0 ? formatTime(duration) : '0:00'}</span>
        </div>

        {/* Volume & Status */}
        <div className="flex items-center justify-between text-[0.75rem] text-muted">
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="hover:text-violet-light transition-colors cursor-pointer">
              {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-violet bg-border-accent/40 h-1 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <span className="text-[0.65rem] font-extrabold tracking-widest uppercase text-violet-light">
            {isPlaying ? 'Играет трек' : 'Готов'}
          </span>
        </div>
      </div>
    </div>
  );
};

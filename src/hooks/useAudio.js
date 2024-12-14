'use client'

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const soundRef = useRef(null);

  const playAudio = (src) => {
    // Si hay un audio reproduciéndose, lo detenemos
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    // Creamos una nueva instancia de audio
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      onload: () => {
        setAudioLoaded(true);
        console.log('Audio loaded:', src);
      },
      onplay: () => {
        setIsPlaying(true);
        console.log('Audio playing:', src);
      },
      onend: () => {
        setIsPlaying(false);
        console.log('Audio ended:', src);
      },
      onstop: () => {
        setIsPlaying(false);
        console.log('Audio stopped:', src);
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error);
        setAudioLoaded(false);
      },
      onplayerror: (id, error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    });

    // Reproducimos el nuevo audio
    soundRef.current.play();
  };

  const stopAudio = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (soundRef.current && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (soundRef.current && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  // Limpiamos el audio cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  return { 
    playAudio, 
    stopAudio, 
    pauseAudio, 
    resumeAudio, 
    toggleAudio, 
    isPlaying,
    audioLoaded 
  };
};
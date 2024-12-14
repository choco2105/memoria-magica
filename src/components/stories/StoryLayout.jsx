'use client'

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ArrowLeft, ArrowRight, Star, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { useAudio } from '@/hooks/useAudio';
import { motion, AnimatePresence } from 'framer-motion';

const StoryLayout = ({ 
  title, 
  score, 
  currentPage,
  totalPages, 
  imageUrl, 
  text, 
  audioSrc,
  onBack, 
  onNext, 
  onPrev,
  themeColor = 'purple',
  gradientFrom,
  gradientTo
}) => {
  const { playAudio, stopAudio, toggleAudio, isPlaying, audioLoaded } = useAudio();

  const getGradient = () => {
    if (themeColor === 'purple') {
      return 'from-purple-100 to-pink-100';
    }
    return 'from-orange-50 to-green-50';
  };

  const getTitleColor = () => {
    if (themeColor === 'purple') {
      return 'text-purple-600';
    }
    return 'text-orange-600';
  };

  // Reproducir audio cuando cambia la página
  useEffect(() => {
    if (audioSrc) {
      playAudio(audioSrc);
    }
    return () => stopAudio();
  }, [currentPage, audioSrc]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getGradient()} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => {
              stopAudio();
              onBack();
            }}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            Inicio
          </Button>
          <h1 className={`text-4xl font-bold ${getTitleColor()} text-center 
            bg-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}>
            {title}
          </h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>

        <Card className="relative overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          {/* Control de Audio */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg"
            disabled={!audioLoaded}
          >
            {isPlaying ? (
              <VolumeX className={`h-6 w-6 ${themeColor === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
            ) : (
              <Volume2 className={`h-6 w-6 ${themeColor === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
            )}
          </Button>

          {/* Indicador de Audio Reproduciendo */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-4 right-16 z-10 bg-white/80 rounded-full px-3 py-1 shadow-md"
              >
                <span className="text-sm font-medium">
                  {themeColor === 'purple' ? '🦋' : '🥕'} Narrando...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative h-[500px] w-full mb-6">
            <Image
              src={imageUrl}
              alt={`Escena ${currentPage + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              priority
              className="p-4"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `linear-gradient(180deg, transparent 70%, ${gradientFrom} 100%)`
          }}/>
          <div className="relative z-10 p-8 rounded-t-3xl" style={{
            background: `linear-gradient(180deg, ${gradientFrom}, ${gradientTo})`
          }}>
            <p className="text-xl leading-relaxed mb-8 text-gray-800 font-medium">
              {text}
            </p>
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => {
                  stopAudio();
                  onPrev();
                }}
                disabled={currentPage === 0}
                variant="outline"
                className="transform hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <span className="text-lg font-medium">
                Página {currentPage + 1} de {totalPages}
              </span>
              <Button 
                onClick={() => {
                  stopAudio();
                  onNext();
                }}
                className={`transform hover:scale-105 transition-all duration-200 
                  ${currentPage === totalPages - 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''}`}
              >
                {currentPage === totalPages - 1 ? (
                  "¡A responder!"
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StoryLayout;
'use client'

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

const QuestionLayout = ({
  question,
  options,
  hint,
  audioSrc,
  onAnswer,
  isCorrect,
  showHint,
  showFeedback,
  buttonsDisabled,
  characterImage,
  themeColor
}) => {
  const { playAudio, stopAudio, toggleAudio, isPlaying } = useAudio();

  useEffect(() => {
    if (audioSrc) {
      playAudio(audioSrc);
    }
    return () => stopAudio();
  }, [audioSrc]);

  const getThemeClasses = () => {
    return themeColor === 'purple' 
      ? { bg: 'bg-purple-50', text: 'text-purple-800' }
      : { bg: 'bg-orange-50', text: 'text-orange-800' };
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <h2 className={`text-2xl font-semibold ${themeColor === 'purple' ? 'text-purple-600' : 'text-orange-600'} mb-6`}>
          {question}
        </h2>
        
        {/* Control de Audio */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAudio}
          className="absolute -right-2 -top-2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg"
        >
          {isPlaying ? (
            <VolumeX className={`h-6 w-6 ${themeColor === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
          ) : (
            <Volume2 className={`h-6 w-6 ${themeColor === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
          )}
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        {options.map((option, index) => (
          <Button
            key={index}
            className="w-full justify-start text-left p-4 h-auto text-lg"
            variant="outline"
            onClick={() => onAnswer(index)}
            disabled={buttonsDisabled}
          >
            {option}
          </Button>
        ))}
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${getThemeClasses().bg} p-6 rounded-xl flex items-center gap-4 shadow-lg`}
        >
          <div className="relative w-24 h-24">
            <Image
              src={characterImage}
              alt="Personaje dando una pista"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className={`${getThemeClasses().text} text-lg`}>
            {hint}
          </p>
        </motion.div>
      )}

      {showFeedback && !showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`p-6 rounded-xl text-center text-lg ${
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <p className={`font-medium ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect 
              ? '¡Excelente! ¡Has ganado una estrella! ⭐'
              : '¡No te preocupes! Vamos a intentarlo de nuevo...'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionLayout;
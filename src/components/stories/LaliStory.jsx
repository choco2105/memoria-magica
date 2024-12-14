'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import StoryLayout from './StoryLayout';
import QuestionLayout from './QuestionLayout';

const LaliStory = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const pages = [
    {
      image: '/assets/images/lali/scenes/lali-escena1.png',
      text: 'Érase una vez, en un bosque mágico lleno de misterios y maravillas, vivía una niña muy especial llamada Lali. ✨ Sus ojos brillaban con curiosidad y su sonrisa iluminaba cada rincón del bosque. Pero lo que más amaba Lali eran las mariposas, esas delicadas criaturas que danzaban en el aire como pequeñas hadas. 🦋',
      audio: '/assets/audio/lali/scene1.mp3'
    },
    {
      image: '/assets/images/lali/scenes/lali-escena2.png',
      text: '¡Un día mágico, algo increíble sucedió! Mientras paseaba por el bosque, Lali descubrió unas mariposas diferentes a todas las que había visto antes. ¡Brillaban con luz propia y dejaban un rastro de destellos mágicos! 🌟 Estas mariposas especiales tenían un secreto: solo los niños con corazones curiosos y bondadosos podían verlas.',
      audio: '/assets/audio/lali/scene2.mp3'
    },
    {
      image: '/assets/images/lali/scenes/lali-escena3.png',
      text: 'Las mariposas mágicas se acercaron a Lali y, ¡sorpresa! Comenzaron a susurrar historias maravillosas en su oído. 🎵 Cada historia venía con un acertijo especial, como un juego mágico que solo Lali podía resolver. Las mariposas se convirtieron en sus maestras más especiales, enseñándole sobre la magia de la paciencia, la alegría de ser amable y el poder de la creatividad. ✨',
      audio: '/assets/audio/lali/scene3.mp3'
    }
  ];

  const questions = [
    {
      question: "¿Qué encontró Lali en el bosque?",
      options: ["Estrellas", "Mariposas mágicas", "Pajaritos"],
      correct: 1,
      hint: "Recuerda que eran criaturas que brillaban y volaban... ✨",
      audio: '/assets/audio/lali/questions/q1.mp3'
    },
    {
      question: "¿Qué hacían las mariposas mágicas cada mañana?",
      options: ["Susurraba una historia", "Cantaba una canción", "Contaba chistes"],
      correct: 0,
      hint: "Las mariposas compartían algo muy especial en voz bajita... 🦋",
      audio: '/assets/audio/lali/questions/q2.mp3'
    },
    {
      question: "¿Qué valores aprendió Lali a través de los acertijos?",
      options: [
        "Respeto, honradez",
        "Paciencia, creatividad, amabilidad",
        "Solidaridad, honestidad"
      ],
      correct: 1,
      hint: "Piensa en lo que necesitas para esperar tranquilo y ser bueno con los demás... 💫",
      audio: '/assets/audio/lali/questions/q3.mp3'
    },
    {
      question: "¿Por quiénes se dejaban ver las mariposas mágicas?",
      options: ["Jóvenes", "Maestras", "Niños curiosos"],
      correct: 2,
      hint: "Las mariposas prefieren a los pequeños que siempre quieren aprender... ✨",
      audio: '/assets/audio/lali/questions/q4.mp3'
    }
  ];

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowQuestion(true);
      displayInstructions();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayInstructions = () => {
    setShowInstructions(true);
    setButtonsDisabled(true);
    setTimeout(() => {
      setShowInstructions(false);
      setButtonsDisabled(false);
    }, 6000);
  };

  const handleAnswer = (selectedOption) => {
    if (buttonsDisabled) return;

    setButtonsDisabled(true);
    const correct = selectedOption === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          showFinalScore();
        }
        setButtonsDisabled(false);
      }, 2000);
    } else {
      setShowHint(true);
      setTimeout(() => {
        setShowFeedback(false);
        setShowHint(false);
        setButtonsDisabled(false);
      }, 6000);
    }
  };

  const showFinalScore = () => {
    setShowCongrats(true);
    setTimeout(() => {
      onBack();
    }, 8000);
  };

  if (!showQuestion) {
    return (
      <StoryLayout
        title="El Misterio de Lali"
        score={score}
        currentPage={currentPage}
        totalPages={pages.length}
        imageUrl={pages[currentPage].image}
        text={pages[currentPage].text}
        audioSrc={pages[currentPage].audio}
        onBack={onBack}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        themeColor="purple"
        gradientFrom="rgba(233, 213, 255, 0.9)"
        gradientTo="rgba(255, 213, 255, 1)"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={onBack} className="hover:scale-105 transition-transform duration-200">
            <Star className="h-5 w-5 mr-2" />
            Inicio
          </Button>
          <h1 className="text-4xl font-bold text-purple-600 text-center bg-white px-8 py-3 rounded-full shadow-lg">
            El Misterio de Lali
          </h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>

        <Card className="relative overflow-hidden shadow-2xl">
          <CardContent className="p-8">
            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
                >
                  <motion.div 
                    className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-600 mb-4">
                      ¡Es hora de poner a prueba tu memoria! ✨
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Responde correctamente las preguntas y gana estrellitas mágicas. 
                      ¡Lali te ayudará si necesitas una pista!
                    </p>
                    <div className="flex justify-center">
                      <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {showCongrats && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
                >
                  <motion.div 
                    className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4 text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <h2 className="text-3xl font-bold text-purple-600 mb-4">
                      ¡Fantástico! 🎉
                    </h2>
                    <div className="relative w-32 h-32 mx-auto my-4">
                      <Image
                        src="/assets/images/lali/characters/lali-personaje.png"
                        alt="Lali celebrando"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p className="text-xl text-gray-700 mb-4">
                      ¡Has completado todas las preguntas y ganado {score} estrellitas mágicas! ⭐
                    </p>
                    <p className="text-lg text-purple-500">
                      ¡Las mariposas están muy orgullosas de ti!
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      {[...Array(score)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showInstructions && !showCongrats && (
              <QuestionLayout
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                hint={questions[currentQuestion].hint}
                audioSrc={questions[currentQuestion].audio}
                onAnswer={handleAnswer}
                isCorrect={isCorrect}
                showHint={showHint}
                showFeedback={showFeedback}
                buttonsDisabled={buttonsDisabled}
                characterImage="/assets/images/lali/characters/lali-personaje.png"
                themeColor="purple"
              />
            )}

            <div className="text-center text-purple-600 mt-8">
              <span className="font-medium text-lg">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaliStory;
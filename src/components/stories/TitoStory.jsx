'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import StoryLayout from './StoryLayout';
import QuestionLayout from './QuestionLayout';

const TitoStory = ({ onBack }) => {
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
      image: '/assets/images/tito/scenes/tito-escena1.png',
      text: '¡En un hermoso campo lleno de flores y aventuras, vivía un conejito muy especial llamado Tito! 🐰 Era pequeñito, pero su curiosidad era gigante. Sus bigotes siempre temblaban de emoción cuando descubría algo nuevo. Un día soleado, mientras saltaba alegremente, sus ojos se abrieron como platos al ver algo ¡INCREÍBLE! 🥕',
      audio: '/assets/audio/tito/scene1.mp3'
    },
    {
      image: '/assets/images/tito/scenes/tito-escena2.png',
      text: '¡Era la zanahoria más GIGANTE que jamás había visto! "¡Guau!" - exclamó Tito, dando saltitos de emoción. 🌟 La zanahoria era tan grande que sobresalía de la tierra como un edificio naranja. Tito, muy valiente, intentó sacarla él solito. Tiró y tiró con todas sus fuerzas, pero... ¡ni siquiera se movió un poquito! 💪',
      audio: '/assets/audio/tito/scene2.mp3'
    },
    {
      image: '/assets/images/tito/scenes/tito-escena3.png',
      text: '"¡Ya sé!", pensó Tito, "¡Necesito ayuda!" 🤔 Llamó a su amiga Nina, la ardilla más ágil del bosque. Nina bajó del árbol más alto dando volteretas en el aire. "¡Yo te ayudo, Tito!" Juntos tiraron con fuerza, pero la zanahoria seguía sin moverse. 🌳',
      audio: '/assets/audio/tito/scene3.mp3'
    },
    {
      image: '/assets/images/tito/scenes/tito-escena4.png',
      text: 'Entonces, apareció Lola, la mariquita más pequeñita pero más fuerte del campo. "¡Tres amigos son mejor que dos!", dijo Lola con una sonrisa. Todos juntos, Tito, Nina y Lola, tiraron y tiraron... ¡y de repente... POP! 💫 ¡La zanahoria gigante salió volando!',
      audio: '/assets/audio/tito/scene4.mp3'
    },
    {
      image: '/assets/images/tito/scenes/tito-escena5.png',
      text: '¡HURRA! 🎉 Todos celebraron su gran logro. Tito estaba tan feliz que decidió compartir su tesoro naranja con sus amigos. Mientras disfrutaban de un delicioso picnic de zanahoria, Tito aprendió que juntos, los amigos pueden lograr cosas INCREÍBLES. Y así, entre risas y bocados de zanahoria, nació una amistad aún más gigante que la zanahoria misma. 🌟',
      audio: '/assets/audio/tito/scene5.mp3'
    }
  ];

  const questions = [
    {
      question: "¿Qué encontró Tito en el campo?",
      options: ["Una fruta", "Una zanahoria gigante", "Un animal"],
      correct: 1,
      hint: "Era algo naranja y muy grande que crecía en la tierra... 🥕",
      audio: '/assets/audio/tito/questions/q1.mp3'
    },
    {
      question: "¿A quién pidió ayuda primero Tito?",
      options: ["A su amiga Lola", "No pidió ayuda", "A su amiga ardilla Nina"],
      correct: 2,
      hint: "Su primera amiga en ayudar fue quien vive en los árboles... 🌳",
      audio: '/assets/audio/tito/questions/q2.mp3'
    },
    {
      question: "¿Qué animales ayudaron a Tito a sacar la zanahoria?",
      options: ["Nadie", "Su amiga la ardilla", "La ardilla Nina y la mariquita Lola"],
      correct: 2,
      hint: "Recuerda que fueron dos amigos especiales... ¡Una vive en los árboles y otra es muy pequeñita! 🐿️",
      audio: '/assets/audio/tito/questions/q3.mp3'
    },
    {
      question: "¿Qué hicieron todos juntos al final?",
      options: ["Tito se comió solo la zanahoria", "Sacaron la zanahoria y la compartieron entre todos"],
      correct: 1,
      hint: "Piensa en lo que hacen los buenos amigos... ¡Compartir es divertido! 🎉",
      audio: '/assets/audio/tito/questions/q4.mp3'
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
        title="El Conejo Tito"
        score={score}
        currentPage={currentPage}
        totalPages={pages.length}
        imageUrl={pages[currentPage].image}
        text={pages[currentPage].text}
        audioSrc={pages[currentPage].audio}
        onBack={onBack}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        themeColor="orange"
        gradientFrom="rgba(255, 237, 213, 0.9)"
        gradientTo="rgba(220, 252, 231, 1)"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={onBack} className="hover:scale-105 transition-transform duration-200">
            <Star className="h-5 w-5 mr-2" />
            Inicio
          </Button>
          <h1 className="text-4xl font-bold text-orange-600 text-center bg-white px-8 py-3 rounded-full shadow-lg">
            El Conejo Tito
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
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">
                      ¡Es hora de poner a prueba tu memoria! 🥕
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Responde correctamente las preguntas y gana estrellitas. 
                      ¡Tito te ayudará si necesitas una pista!
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
                    <h2 className="text-3xl font-bold text-orange-600 mb-4">
                      ¡Increíble! 🎉
                    </h2>
                    <div className="relative w-32 h-32 mx-auto my-4">
                      <Image
                        src="/assets/images/tito/characters/tito-personaje.png"
                        alt="Tito celebrando"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p className="text-xl text-gray-700 mb-4">
                      ¡Has completado todas las preguntas y ganado {score} estrellitas! ⭐
                    </p>
                    <p className="text-lg text-orange-500">
                      ¡Tito y sus amigos están muy orgullosos!
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
                characterImage="/assets/images/tito/characters/tito-hint.png"
                themeColor="orange"
              />
            )}

            <div className="text-center text-orange-600 mt-8">
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

export default TitoStory;
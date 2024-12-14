import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Home } from 'lucide-react';

const StoryView = ({ story, onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handlePlayAudio = () => {
    setAudioPlaying(!audioPlaying);
    // Aquí irá la lógica del audio cuando lo implementemos
  };

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowQuestion(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onBack}>
          <Home className="h-4 w-4 mr-2" />
          Inicio
        </Button>
        <h1 className="text-3xl font-bold text-purple-600">{story.title}</h1>
        <div className="w-24">
          {audioPlaying && <span className="text-sm text-gray-500">Reproduciendo...</span>}
        </div>
      </div>

      <Card className="relative">
        <CardContent className="p-6">
          {!showQuestion ? (
            <>
              <div className="relative">
                <div className="h-64 bg-purple-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-purple-500 text-lg">Imagen de la escena {currentPage + 1}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={handlePlayAudio}
                >
                  {audioPlaying ? 
                    <VolumeX className="h-6 w-6" /> : 
                    <Volume2 className="h-6 w-6" />
                  }
                </Button>
              </div>
              <p className="text-lg mb-8">{story.pages[currentPage].text}</p>
              <div className="flex justify-between">
                <Button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button onClick={handleNextPage}>
                  {currentPage === story.pages.length - 1 ? (
                    "¡A responder!"
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div>
              {/* Aquí irán las preguntas - lo implementaremos en el siguiente paso */}
              <p className="text-center text-lg">¡Preguntas próximamente!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryView;
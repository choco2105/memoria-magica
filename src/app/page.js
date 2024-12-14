'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Sparkles } from 'lucide-react'
import Image from 'next/image'
import LaliStory from '@/components/stories/LaliStory'
import TitoStory from '@/components/stories/TitoStory'
import SplashScreen from '@/components/SplashScreen'

const Home = () => {
  const [currentStory, setCurrentStory] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (currentStory === 'lali') {
    return <LaliStory onBack={() => setCurrentStory(null)} />;
  }

  if (currentStory === 'tito') {
    return <TitoStory onBack={() => setCurrentStory(null)} />;
  }

  return (
    <main className="min-h-screen bg-gradient-radial from-purple-100 via-blue-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full">
            <div className="flex justify-center space-x-2 animate-bounce">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <Sparkles className="h-8 w-8 text-purple-400" />
              <Sparkles className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            Memoria Mágica
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            ¡Explora cuentos interactivos y ejercita tu memoria!
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Cuento de Lali */}
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <CardTitle className="text-3xl font-bold text-white text-center">
                El Misterio de Lali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="relative w-full h-64 rounded-xl mb-6 overflow-hidden shadow-lg">
                <Image 
                  src="/assets/images/lali/menu-lali.png"
                  alt="Lali y las mariposas mágicas"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50"
                  priority
                />
              </div>
              <p className="mb-8 text-lg text-gray-600 text-center">
                Descubre la mágica historia de Lali y sus amigas las mariposas en una aventura llena de curiosidad y aprendizaje.
              </p>
              <Button 
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => setCurrentStory('lali')}
              >
                <Book className="mr-3 h-6 w-6" />
                Comenzar Aventura
              </Button>
            </CardContent>
          </Card>

          {/* Cuento de Tito */}
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 p-6">
              <CardTitle className="text-3xl font-bold text-white text-center">
                El Conejo Tito
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="relative w-full h-64 rounded-xl mb-6 overflow-hidden shadow-lg">
                <Image 
                  src="/assets/images/tito/menu-tito.png"
                  alt="Tito y la zanahoria gigante"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4 bg-gradient-to-br from-orange-50 to-green-50"
                  priority
                />
              </div>
              <p className="mb-8 text-lg text-gray-600 text-center">
                Acompaña a Tito en su divertida aventura buscando la zanahoria gigante y descubriendo el valor del trabajo en equipo.
              </p>
              <Button 
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => setCurrentStory('tito')}
              >
                <Book className="mr-3 h-6 w-6" />
                Comenzar Aventura
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
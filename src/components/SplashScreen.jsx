'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-200 to-purple-100 flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo (mágica) que ocupa toda la pantalla */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 3,
          times: [0, 0.2, 0.8, 1],
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/intro/welcome-image.png"
            alt="Bienvenida a Memoria Mágica"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Nube izquierda ocupando media pantalla */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/intro/cloud-left.png"
            alt="Nube izquierda"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Nube derecha ocupando media pantalla */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/intro/cloud-right.png"
            alt="Nube derecha"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Texto de bienvenida con efecto */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          times: [0, 0.2, 0.8, 1]
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Bienvenido a
          </h1>
          <h2 className="text-7xl font-bold text-white drop-shadow-lg">
            Memoria Mágica
          </h2>
        </div>
      </motion.div>
    </div>
  );
}

export default SplashScreen;
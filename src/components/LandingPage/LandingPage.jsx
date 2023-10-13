import React from 'react'
import landing from './../../assets/landing.jpeg'

function LandingPage() {
  return (
    <div className="relative h-screen">
      <img
        src={landing}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ filter: 'blur(5px) brightness(0.3)' }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-lila text-8xl font-extrabold mb-10">¿Buscas algo que ver?</h1>
        <h2 className="text-clarito text-3xl font-normal mb-2">Encuentra tus películas y series favoritas, lleva un registro</h2>
        <h2 className="text-clarito text-3xl font-normal">de cuáles has visto y no pierdas de vista los estrenos.</h2>
      </div>
    </div>
  );
}
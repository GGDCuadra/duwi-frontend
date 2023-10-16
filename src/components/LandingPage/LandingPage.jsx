import React from 'react'
import landing from './../../assets/landing.jpeg'
import Footer from '../Footer/Footer';
import Top10Movies from '../Top10Movies/Top10Movies';
import Top10Series from '../Top10Series/Top10Series';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='flex-1 relative'>
      <img
        src={landing}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ filter: 'blur(5px) brightness(0.3)' }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-lila text-8xl font-black mb-10 font-poppins">¿Buscas algo que ver?</h1>
        <h2 className="text-clarito text-3xl font-normal mb-2 font-poppins">Encuentra tus películas y series favoritas, lleva un registro</h2>
        <h2 className="text-clarito text-3xl font-normal font-poppins">de cuáles has visto y no pierdas de vista los estrenos.</h2>
      </div>
      </div>
      <div className='text-3xl font-normal m-8 mb-2 font-poppins'>
      <Top10Movies/>
      </div>
      <div className='text-3xl font-normal m-8 mb-2 font-poppins'>
      <Top10Series />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
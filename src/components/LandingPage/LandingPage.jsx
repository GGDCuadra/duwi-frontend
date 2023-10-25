import React from 'react';
import landing from './../../assets/landing.jpeg';
import Footer from '../Footer/Footer';
import Top10Movies from '../Top10Movies/Top10Movies';
import Top10Series from '../Top10Series/Top10Series';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto" style={{ marginTop: '1px' }}>
      <div className="relative">
        <img
          src={landing}
          alt="Background"
          className="w-full h-65 object-cover filter blur brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-lila text-8xl font-black font-poppins mb-4">
            ¿Buscas algo que ver?
          </h1>
          <h2 className="text-clarito text-3xl font-normal font-poppins mb-2">
            Encuentra tus películas y series favoritas, lleva un registro
          </h2>
          <h2 className="text-clarito text-3xl font-normal font-poppins">
            de cuáles has visto y no pierdas de vista los estrenos.
          </h2>
        </div>
      </div>
      <div className="text-3xl font-normal m-8 font-poppins">
        <div className='ml-24'>
        <Top10Movies />
        </div>
      </div>
      <div className="text-3xl font-normal m-8 font-poppins">
      <div className='ml-24'>
        <Top10Series />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
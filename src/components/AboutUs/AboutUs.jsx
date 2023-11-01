import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Alejandra Riaño",
    photoURL: "https://i.postimg.cc/TLVSXkgk/Ale.jpg",
    githubURL: "https://github.com/DanielaAlejandraR",
    linkedinURL: "https://www.linkedin.com/in/alejandra-ria%C3%B1o-92515b278/",
  },
  {
    name: "Andrés Anguiano",
    photoURL: "https://i.postimg.cc/RqmyTBx2/Andr-s.jpg",
    githubURL: "https://github.com/Anngues",
    linkedinURL: "https://www.linkedin.com/in/anngues/",
  },
  {
    name: "Danna Liseth",
    photoURL: "https://i.postimg.cc/H8TNWQtT/Danna.jpg",
    githubURL: "https://github.com/DlisethChiquillo",
    linkedinURL: "https://www.linkedin.com/in/danna-liseth-chiquillo-b2510a266/",
  },
  {
    name: "Dilan Usuga",
    photoURL: "https://i.postimg.cc/kgS3Pffj/Dilan.png",
    githubURL: "https://github.com/Dilan01188",
    linkedinURL: "URL_DE_LINKEDIN_Dilan",
  },
  {
    name: "Genrry de Cuadra",
    photoURL: "https://i.postimg.cc/QFFyMNcK/Genrry.jpg",
    githubURL: "https://github.com/GGDCuadra",
    linkedinURL: "https://www.linkedin.com/in/genrry-de-cuadra/",
  },
  {
    name: "Rocío Rivera",
    photoURL: "https://i.postimg.cc/HWvfJfNZ/Roc-o.png",
    githubURL: "https://github.com/RRivera99",
    linkedinURL: "https://www.linkedin.com/in/rocio-rivera-588b5b164/",
  },
  {
    name: "Wendy Rius",
    photoURL: "https://i.postimg.cc/9DsNw3B8/Wen.jpg",
    githubURL: "https://github.com/riuswen",
    linkedinURL: "https://www.linkedin.com/in/riuswen/",
  },
  {
    name: "Lucas Zamblera",
    photoURL: "https://i.postimg.cc/KRqWF33y/Lucas.jpg",
    githubURL: "https://github.com/LDZamblera",
    linkedinURL: "https://www.linkedin.com/in/lucas-zamblera-a80275217/",
  },
];

const AboutUs = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold font-poppins text-moradito text-center mt-9 mb-9 dark:text-lila">Sobre Nosotros</h2>
      <p className="text-moradito text-lg text-justify mb-4 mt-4 font-poppins dark:text-clarito">
        Somos un equipo de desarrolladores apasionados por la tecnología y la creación de aplicaciones innovadoras. </p> 
      <p className="text-moradito text-lg text-justify mb-4 mt-4 font-poppins dark:text-clarito">Nuestra última creación es una aplicación de películas y series que combina la potencia de Express, MongoDB, Node.js, React, Redux, JavaScript, HTML y Tailwind CSS para ofrecer una experiencia única a los amantes del entretenimiento.
      </p>
      <h3 className="text-3xl font-bold text-moradito mb-5 font-poppins mt-9 text-center dark:text-lila">Conócenos:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="rounded-lg border border-lila p-4 text-center">
            <img
              src={member.photoURL}
              alt={`Foto de ${member.name}`}
              className="w-32 h-32 rounded-full mx-auto mb-2"
            />
            <p className="text-moradito font-poppins text-lg mb-2 dark:text-lila">{member.name}</p>
            <a href={member.githubURL} target="_blank" rel="noopener noreferrer" className="text-moradito font-poppins text-lg mb-2 hover:text-lila dark:text-lila dark:hover:text-clarito">
              <FaGithub className="mr-2 inline" /> GitHub
            </a>
            <a href={member.linkedinURL} target="_blank" rel="noopener noreferrer" className="text-moradito font-poppins text-lg hover:text-lila dark:text-lila dark:hover:text-clarito">
              <FaLinkedin className="mr-2 inline ml-10" /> LinkedIn
            </a>
          </div>
        ))}
      </div>
      <h3 className="text-3xl font-bold text-moradito mb-5 font-poppins mt-9 text-center dark:text-lila">Acerca de Did U Watch It?:</h3>
      <p className="text-moradito text-lg text-justify mb-4 font-poppins  dark:text-clarito">
        Nuestra aplicación de películas y series se creó para brindar a los usuarios una forma sencilla de descubrir y explorar nuevas películas y series de su interés. Elegimos esta temática porque creemos que el entretenimiento audiovisual es una forma poderosa de conectar a las personas y ofrecerles momentos de escapismo y diversión. Nuestro objetivo es proporcionar una plataforma intuitiva y atractiva que haga que el descubrimiento de contenido sea una experiencia agradable y emocionante para todos los usuarios.
      </p>
      <p className="text-moradito text-lg text-justify mb-4 font-poppins  dark:text-clarito">
        Estamos comprometidos con la excelencia técnica y la satisfacción del usuario, y seguimos trabajando arduamente para mejorar y ampliar las capacidades de nuestra aplicación. Si tienes alguna sugerencia o comentario, ¡no dudes en contactarnos! Agradecemos tu apoyo y esperamos que disfrutes de la experiencia cinematográfica que hemos creado con tanto cariño.
      </p>
    </div>
  );
};

export default AboutUs;

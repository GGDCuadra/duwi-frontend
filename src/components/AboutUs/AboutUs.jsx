import React from "react";
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>Sobre Nosotros</h2>
      <p className={styles.aboutParagraph}>
        Somos un equipo de desarrolladores apasionados por la tecnología y la creación de aplicaciones innovadoras. Nuestra última creación es una aplicación de películas y series que combina la potencia de Express, MongoDB, Node.js, React, Redux, JavaScript, HTML y Tailwind CSS para ofrecer una experiencia única a los amantes del entretenimiento.
      </p>
      <h3 className={styles.aboutTitle}>Miembros del Equipo:</h3>
      <ul className={`${styles.aboutList} ${styles.aboutParagraph}`}>
        <li>Alejandra Riaño</li>
        <li>Andrés Anguiano</li>
        <li>Danna Liseth</li>
        <li>Dilan Usuga</li>
        <li>Genrry de Cuadra</li>
        <li>Rocío Rivera</li>
        <li>Wendy Rius</li>
        <li>Lucas Zamblera</li>
      </ul>
      <p className={styles.aboutParagraph}>
        Nuestra aplicación de películas y series se creó para brindar a los usuarios una forma sencilla de descubrir y explorar nuevas películas y series de su interés. Elegimos esta temática porque creemos que el entretenimiento audiovisual es una forma poderosa de conectar a las personas y ofrecerles momentos de escapismo y diversión. Nuestro objetivo es proporcionar una plataforma intuitiva y atractiva que haga que el descubrimiento de contenido sea una experiencia agradable y emocionante para todos los usuarios.
      </p>
      <p className={styles.aboutMessage}>
        Estamos comprometidos con la excelencia técnica y la satisfacción del usuario, y seguimos trabajando arduamente para mejorar y ampliar las capacidades de nuestra aplicación. Si tienes alguna sugerencia o comentario, ¡no dudes en contactarnos! Agradecemos tu apoyo y esperamos que disfrutes de la experiencia cinematográfica que hemos creado con tanto cariño.
      </p>
    </div>
  );
};

export default AboutUs;
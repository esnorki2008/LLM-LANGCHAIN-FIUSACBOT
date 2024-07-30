import React, { useState, useEffect } from 'react';
import { About } from './about';
import { Navigation } from './navigation';
import { Header } from './header';
import SmoothScroll from 'smooth-scroll';
import { Helmet } from 'react-helmet';
import JsonData from './data.json';
import { Features } from './features';
import { Contact } from './contact';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Start = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JsonData);
    // Función para cargar un script y retornar una promesa
    const loadScript = (url) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    // Cargar jQuery y luego Bootstrap
    loadScript('js/jquery.1.11.1.js')
      .then(() => {
        console.log('jQuery loaded');
        return loadScript('js/bootstrap.js');
      })
      .then(() => {
        console.log('Bootstrap loaded');
      })
      .catch((error) => {
        console.error('Failed to load scripts', error);
      });

    // Función de limpieza para remover los scripts al desmontar el componente
    return () => {
      document.querySelectorAll('script[src^="js/"]').forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);
  if (!data) {
    return <div>Loading...</div>; // Muestra esto mientras los datos no están disponibles
  }
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/App.css" />
      </Helmet>
      <div>
        <Navigation />
        <Header />
        <Features />
        <About />
        <Contact />
      </div>
    </>
  );
};
export default Start;

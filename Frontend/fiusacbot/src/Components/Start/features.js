import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import JsonData from './data.json';

export const Features = () => {
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
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="fonts/font-awesome/css/font-awesome.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="css/nivo-lightbox/nivo-lightbox.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="css/nivo-lightbox/default.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
          rel="stylesheet"
        />
      </Helmet>
      <div id="features" className="text-center">
        <div className="container">
          <hr />
          <div className="col-md-0 col-md-offset-0 section-title">
            <h2>Beneficios</h2>
          </div>
          <div className="row">
            {data
              ? data.Features.map((d, i) => (
                  <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                    {' '}
                    <i className={d.icon}></i>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    </>
  );
};

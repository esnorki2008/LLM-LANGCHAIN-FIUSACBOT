import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import JsonData from './data.json';

export const Contact = () => {
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
      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Contáctanos</h2>
                  <p>
                    No dudes en comunicarte con nosotros utilizando cualquiera
                    de los canales de comunicación que te proporcionamos a
                    continuación. Nuestro equipo está aquí para asistirte con
                    cualquier consulta, asesoría de proyectos, o oportunidades
                    de colaboración que puedas tener. Ya sea que prefieras
                    enviarnos un correo electrónico, llamarnos, o visitarnos en
                    persona, estamos comprometidos a brindarte un servicio y
                    apoyo excepcionales. ¡No dudes en ponerte en contacto con
                    nosotros – esperamos saber de ti pronto!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Información de Contacto</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Dirección
                  </span>
                  {data ? data.Contact.address : 'cargando'}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Teléfono
                  </span>{' '}
                  {data ? data.Contact.phone : 'cargando'}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Correo Electrónico
                  </span>{' '}
                  {data ? data.Contact.email : 'cargando'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="container text-center">
            <p>FIUSACBOT 2024</p>
          </div>
        </div>
      </div>
    </>
  );
};

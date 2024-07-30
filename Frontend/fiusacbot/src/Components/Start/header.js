import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import JsonData from './data.json';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Header = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    setData(JsonData);
    const loadScript = (url) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

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

    return () => {
      document.querySelectorAll('script[src^="js/"]').forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleChatClick = () => {
    navigate('/Chat/'); // Navigate to /Login/Login when the button is clicked
  };

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
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {data ? data.Header.title : 'Loading'}
                    <span></span>
                  </h1>
                  <p>{data ? data.Header.paragraph : 'Loading'}</p>
                  <a
                    className="btn btn-custom btn-lg page-scroll"
                    onClick={handleChatClick}
                  >
                    Iniciar Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

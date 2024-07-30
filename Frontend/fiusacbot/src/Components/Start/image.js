import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { Helmet } from 'react-helmet';

export const Image = ({ title, largeImage, smallImage }) => {
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
      <div className="portfolio-item">
        <div className="hover-bg">
          <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
            <div className="hover-text">
              <h4>{title}</h4>
            </div>
            <img src={smallImage} className="img-responsive" alt={title} />
          </a>
        </div>
      </div>
    </>
  );
};

// Aquí añades las validaciones de PropTypes
Image.propTypes = {
  title: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
};

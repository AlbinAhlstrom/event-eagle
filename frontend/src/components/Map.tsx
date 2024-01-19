import React from 'react';

const Map= () => {
  const mapStyle = {
    width: '100%',
    height: '600px',
  };

  return (
    <div style={mapStyle}>
      <iframe
        style={mapStyle}
        title="Grafton Street Map"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(You%20are%20here!)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.maps.ie/population/">Find Population on Map</a>
      </iframe>
    </div>
  );
}

export default Map;
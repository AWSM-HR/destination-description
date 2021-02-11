import React from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';

import Key from '../../../googleApiKey';
console.log('key ', Key);
const Map = ({ coordslat, coordslong }) => (
  <div className="google-map">
    <GoogleMap
      bootstrapURLKeys={{ key: Key }}
      center={[coordslat, coordslong]}
      zoom={9}
    />
  </div>
);

Map.propTypes = {
  coordslat: PropTypes.string.isRequired,
  coordslong: PropTypes.string.isRequired,
};

export default Map;

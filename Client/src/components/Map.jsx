import React from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';

import Key from '../../../googleApiKey';

const Map = ({ coordsLat, coordsLong }) => (
  <div className="google-map">
    <GoogleMap
      bootstrapURLKeys={{ key: Key }}
      center={[coordsLat, coordsLong]}
      zoom={9}
    />
  </div>
);

Map.propTypes = {
  coordsLat: PropTypes.string.isRequired,
  coordsLong: PropTypes.string.isRequired,
};

export default Map;

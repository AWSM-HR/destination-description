import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { Icon } from '@iconify/react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { StyledImg } from '../componentStyles';

const Attraction = ({ attraction }) => (
  <Grid container spacing={1}>
    <Grid item xs={5}>
      <StyledImg variant="square" src={attraction.imageurl} alt="A fun activity" />
    </Grid>
    <Grid item xs={7}>
      {attraction.basicdescription}
      {' '}
      <Rating
        style={{ color: 'rgb(52, 224, 161' }}
        name="customized-icons"
        value={attraction.ratingsavg}
        precision={0.5}
        size="small"
        icon={<FiberManualRecordIcon />}
        getLabelText={() => `${attraction.ratingstotal} reviews`}
      />
      {' '}
      {`(${attraction.ratingstotal})`}
      <br />
      <DirectionsWalk />
      {attraction.distancefrom}
      miles
      <br />
      {' $'}
      {attraction.price}
    </Grid>
  </Grid>
);

Attraction.propTypes = {
  attraction: PropTypes.shape({
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    distanceFrom: PropTypes.string,
    basicDescription: PropTypes.string,
  }).isRequired,
};
export default Attraction;

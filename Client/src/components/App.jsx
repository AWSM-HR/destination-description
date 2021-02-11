import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import {
  StyledDoc, StyledRoot, StyledWhatTravellers, RatingBubbles, ReviewStayRight,
} from '../componentStyles';
import Reviews from './Reviews';
import Map from './Map';
import NearbyInfo from './NearbyInfo';

const App = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [mainAttraction, setMainAttraction] = useState(null);

  useEffect(() => {
    getLocation();
    getRestaurants();
    getAttractions();
  }, []);

  const getLocation = () => {
    Axios.get('http://localhost:3000/api/location')
    // Axios.get('/api/restaurant')
      .then((result) => {
        console.log('loc ', result.data.rows[0]);
        const answer = result.data.rows[0];
        // const { data } = result;
        setLocation(answer);
      })
      .catch((err) => { console.log(err); });
  };

  const getRestaurants = () => {
    Axios.get('http://localhost:3000/api/restaurant')
    // Axios.get('/api/restaurant')
      .then((result) => {
        console.log('res ', result.data.rows[0]);
        const answer = result.data.rows.slice(0, 5);
        // const { data } = result;
        setRestaurants(answer);
      })
      .catch((err) => { console.log(err); });
  };

  const getAttractions = (id) => {
    id = 1234;
    Axios.get(`http://localhost:3000/api/attraction/${id}`)
    // Axios.get('/api/attraction')
      .then((result) => {
        console.log('attr ', result.data.rows[0]);
          const answer = result.data.rows.slice(0, 10);
        // const { data } = result;
        setAttractions(answer);
      });
  };
  // getAttractions() {
  //   Axios.get('http://localhost:3000/api/attraction')
  //   // Axios.get('/api/attraction')
  //   .then((result) => {
  //     console.log('attr ', result.data.rows[0]);
  //    const answer = result.data.rows.slice(0, 10);
  //     // const { data } = result;
  //     this.setState({
  //       attractions: answer,
  //     });
  //   })
  //     .then(() => {
  //       const { attractions } = this.state;
  //       this.setState({
  //         mainAttraction: attractions[3],
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }

  return (
    <StyledRoot>
      <StyledDoc>
        { location
            && (
              <div>
                <div className="reviews">
                  <Grid container spacing={0}>
                    <StyledWhatTravellers item xs={3}>
                      What travelers are saying about
                      {' '}
                      {location.name}
                    </StyledWhatTravellers>
                    <RatingBubbles item xs={1}>
                      <h1 style={{ float: 'right', top: '-50' }}>
                        {location.ratingsavg}
                      </h1>
                    </RatingBubbles>
                    <RatingBubbles item xs={1}>
                      <Rating
                        style={{ color: 'rgb(52, 224, 161' }}
                        name="customized-icons"
                        value={location.ratingsavg}
                        precision={0.5}
                        size="small"
                        icon={<FiberManualRecordIcon />}
                        getLabelText={() => `${location.ratingstotal} reviews`}
                      />
                    </RatingBubbles>
                    <ReviewStayRight item xs={7}>
                      <h5 style={{ float: 'right' }}>
                        {`Read all ${location.ratingstotal} reviews`}
                      </h5>
                    </ReviewStayRight>
                  </Grid>
                  <Reviews
                    reviews={location.reviews}
                    // ratings={location.ratings}
                  />
                </div>
                <div className="map">
                  <Map
                    coordsLat={location.coordslat}
                    coordsLong={location.coordslong}
                  />
                </div>
              </div>
            ) }
        {location && restaurants && mainAttraction && attractions && (
          <div className="information-panel">
            <NearbyInfo
              location={location}
              restaurants={restaurants}
              mainAttraction={mainAttraction}
              attractions={attractions}
            />
          </div>
        ) }
      </StyledDoc>
    </StyledRoot>
  );
};

export default App;

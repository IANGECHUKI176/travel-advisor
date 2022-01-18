import GoogleMapReact from "google-map-react";
import { Card, Typography, useMediaQuery ,Paper} from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import mapStyles from './mapStyles'
const Map = ({ coordinates, setCoordinates, setBounds, places,setChildClicked ,weatherData}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:600px)`);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        }}
        defaultCenter={coordinates}
        defaultZoom={14}
        center={coordinates}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <LocationOn color='primary' fontSize='large' />
            ) : (
              <Paper className={classes.paper} elevation={3}>
                <Typography variant='subtitle1' gutterBottom>
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  className={classes.pointer}
                />
                <Rating value={Number(place.rating)} size='small' readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lng={data?.coord?.lon} lat={data?.coord?.lat}>
            <img
              height={100}
              src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
              alt='nop'
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

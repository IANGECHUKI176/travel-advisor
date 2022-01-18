import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@material-ui/core";
import { LocationOn, Phone } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();
  if (selected ) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {place.name}
        </Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly />
          <Typography variant='subtitle1' gutterBottom>
            Out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography variant='subtitle1' gutterBottom>
            {place.price_level}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography variant='subtitle1' gutterBottom>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            my={1}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <img src={award?.images?.small} alt={award?.display_name} />
            <Typography color='textSecondary' variant='subtitle2'>
              {award?.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name },i) => (
          <Chip
            key={i}
            label={name}
            clickable
            size='small'
            className={classes.chip}
          />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant='body2'
            color='textSecondary'
            className={classes.subtitle}
          >
            <LocationOn />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant='body2'
            color='textSecondary'
            className={classes.spacing}
          >
            <Phone />
            {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;

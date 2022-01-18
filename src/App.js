import List from "./components/List/List";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { getPlacesData, getWeatherData} from "./api/index";
import { useEffect, useState, useMemo } from "react";

const App = () => {
  const [mode, setMode] = useState("light");
  const [weatherData, setWeatherData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("london");
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);
  
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then(
        (data) => {
          setWeatherData(data);
        }
      );
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          background: {
            dark: "hsl(230, 17%, 14%)",
            light: "hsl(0, 0%, 100%)",
          },
          primary: {
            main: "#0000FF",
          },
          secondary: {
            main: "#263238",
          },
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        mode={mode}
        setMode={setMode}
        setCoordinates={setCoordinates}
        
      />
      <Grid container spacing={3} styles={{ width: "100vw" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;

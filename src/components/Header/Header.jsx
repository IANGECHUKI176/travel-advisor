import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, InputBase, Typography, Box,Switch } from "@material-ui/core";
import { Search} from "@material-ui/icons";
import {useStyles} from './styles'
import { useState } from "react";
const Header = ({setMode,mode,setCoordinates,}) => {
    const classes=useStyles()
    const [themeSelected, setThemeSelected] = useState("primary");
    const [autocomplete,setAutocomplete] = useState(null)
    const changeTheme = () => {
      if (themeSelected === "primary") setThemeSelected("secondary");
      else setThemeSelected("primary");
    };
    const onLoad = (autoc) =>{setAutocomplete(autoc)}
 
    const onPlaceChanged=()=>{
      const lat=autocomplete.getPlace().geometry.location.lat()
      const lng=autocomplete.getPlace().geometry.location.lng()
      setCoordinates({lat,lng})
      
    }
  return (
    <AppBar
      position='static'
      styles={{ maxWidth: "100vw" }}
      color={themeSelected}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel advisor
        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          </Autocomplete>
          <Switch
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            onClick={() => {
              changeTheme();
            }}
            color="default"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

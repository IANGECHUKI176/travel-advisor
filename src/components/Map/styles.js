import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
}));
// const theme = createMuiTheme({
//   overrides: { MuiAppBar: { colorPrimary: { backgroundColor: "blue" } } },
//   palette: { type: "dark" },
// });

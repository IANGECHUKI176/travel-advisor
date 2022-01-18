import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginRight:0
  },
  container:{
      padding:25
  },
  list:{
      overflow:'auto',
      height:'75vh'
  },
  loading:{
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  }
}));
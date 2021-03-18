import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 200,
    width: 379,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  photo: {
    marginTop: 62,
    marginBottom: -22,
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '365px',
    backgroundColor: 'white',
    borderRadius: '15px',
  },
  overlay: {
    top: '10px',
    position: 'absolute',
    left: '20px',
    alignContent: 'left',
    fontFamily: 'Helvetica',
  },
  time:{
    position: 'absolute',
    fontSize: 'small',
  },
  overlay2: {
    position: 'absolute',
    right: 0,
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 380,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    color: 'black',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    display: 'inline-flex',
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  video: {
    marginTop: 45,
    marginLeft: -16,
    marginBottom: -15,
  },
  buttons:{
    width: '100%',
    textAlign: 'center',
    display: 'inline-flex',
    padding: '5px 5px 5px 5px',
  },
  button:{
    
  }
}));
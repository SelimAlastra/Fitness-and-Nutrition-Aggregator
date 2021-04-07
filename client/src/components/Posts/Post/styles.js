import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 200,
    width: 379,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    marginBottom: -37,
  },
  photo: {
    marginTop: 62,
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '365px',
    width: '379px',
    backgroundColor: 'white',
    borderRadius: '15px',
    margin: '10px 10px 10px 10px',
  },
  overlay: {
    //marginLeft: '10px',
    top: '10px',
    position: 'absolute',
    left: '20px',
    alignContent: 'left',
    fontFamily: 'Helvetica',
  },
  creator:{
    position: 'absolute'
  },
  time:{
    marginTop: '20px',
    fontSize: 'small',
    textAlign: 'inherit',
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
    marginTop: 20,
    textAlign: "left",
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
  embeddedLink: {
    marginTop: 15,
    marginLeft: -18,
    marginBottom: -12,
  },
  facebookLink: {
    marginTop: 15,
    marginLeft: -18,
    marginBottom: -12,
  },
  audio: {
    marginTop: 45,
    marginBottom: 102,
  },
  buttons:{
    width: '100%',
    textAlign: 'center',
    display: 'inline-flex',
    padding: '3px 5px',
  },
}));
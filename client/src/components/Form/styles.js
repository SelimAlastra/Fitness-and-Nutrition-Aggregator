import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    }
  },
  focused: {},
  notchedOutline: {},
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  outline: {
    borderColor: 'black'
  },
  cssLabel: {
    '&$cssFocused': {
      color: 'black !important',
    }
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'black !important',
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'black !important'
  },

}));
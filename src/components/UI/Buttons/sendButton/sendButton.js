import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),

  },
  input: {
    display: 'none',
  },
}));

const ContainedButtons = (props) => {
  const classes = useStyles();
  return (
    
    <Button
      size = {props.size}
      variant="contained"
      color={props.type}
      className={classes.button}
      onClick={props.clicked}
      disabled={!props.disabled}>
      {props.children}
    </Button>
  );
}

export default ContainedButtons;

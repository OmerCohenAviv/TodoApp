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
    <div>
      <Button variant="contained" color={props.type} className={classes.button} onClick={props.clicked} disabled={!props.disable}>
          {props.children}
      </Button>

    </div>
  );
}

export default ContainedButtons;

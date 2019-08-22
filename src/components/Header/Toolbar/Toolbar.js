import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary' style={{marginBottom:'25px'}}>
        <Toolbar >
          <NavigationItems auth={props.auth}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}


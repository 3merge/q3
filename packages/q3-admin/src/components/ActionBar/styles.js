import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      height: 65,
      justifyContent: 'center',
      zIndex: 1,
      overflowX: 'auto',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,

      '& *': {
        //   backgroundColor: 'transparent',
      },
    },
  },
}));

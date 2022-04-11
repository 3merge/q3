import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      marginTop: '-1rem',
    },
  },
}));

import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '& li': {
      margin: 0,
      padding: 0,
    },

    '& a, & button': {
      color: 'inherit',
      fontSize: '0.875rem',
    },

    '& [aria-current="page"]': {
      color: theme.palette.secondary.main,
    },
  },
}));

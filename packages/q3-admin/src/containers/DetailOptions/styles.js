import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: `${theme.spacing(1)} 0 0 0`,
    minWidth: 280,

    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },

  chip: {
    border: 'none',
    height: 'auto',
    minHeight: 32,
    lineHeight: 1,
    maxWidth: 280,

    '& span': {
      whiteSpace: 'break-spaces',
    },

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
}));

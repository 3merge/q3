import { makeStyles } from '@material-ui/core/styles';
import { yellow, red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: 'auto',
    height: '85vh',

    [theme.breakpoints.down('md')]: {
      height: '100%',
    },

    '& .fc .fc-button-primary,&.fc .fc-button-primary:not(:disabled):active,& .fc .fc-button-primary:not(:disabled).fc-button-active':
      {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: 'inherit',
        margin: theme.spacing(0.5),
        borderRadius: 0,
        fontSize: '1rem',
        transition: 'color,border 150ms',

        '&:hover': {
          backgroundColor: theme.palette.background.muted,
        },

        '&:focus': {
          boxShadow: 'none',
        },
      },

    '& .fc .fc-button-primary:not(:disabled):active,& .fc .fc-button-primary:not(:disabled).fc-button-active':
      {
        color: 'inherit',
      },

    '& .fc .fc-button-group > .fc-button:focus,& .fc .fc-button-group > .fc-button:active,& .fc .fc-button-group > .fc-button.fc-button-active':
      {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        color: `2px solid ${theme.palette.secondary.main}`,
      },

    '& .fc .fc-button .fc-icon': {
      fontSize: '1rem',
    },

    '& .fc-next-button, & .fc-prev-button': {
      border: 'none !important',
    },

    '& .fc-toolbar-title': {
      fontSize: theme.typography.h6.fontSize,
    },

    '& .fc-button-group button': {},

    '& .fc .fc-button-primary:disabled': {
      backgroundColor: theme.palette.background.default,
      borderColor: 'transparent',
      cursor: 'not-allowed',
      color: 'inherit',
    },

    '& .fc-view-container': {
      overflowX: 'scroll',
    },

    '& .fc-theme-standard td': {
      borderColor: `${theme.palette.background.muted} !important`,
    },

    '& .fc-day': {
      backgroundColor: theme.palette.background.paper,
    },

    '& .fc-day-today': {
      backgroundColor: `${yellow[50]} !important`,
    },

    '& .fc-bg-event': {
      backgroundColor: `${red[50]} !important`,
      color: `${red[900]} !important`,
      cursor: 'not-allowed',
      opacity: '1 !important',
      fontWeight: 'bold',
      padding: '.5rem',
    },
  },
}));

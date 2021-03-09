import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const color = 'var(--color-default)';

const headingFont = {
  fontWeight: 400,
  fontFamily: '"Source Sans Pro", sans-serif',
  lineHeight: 1.1,
};

const generateShadows = () => {
  const arr = ['none'];
  for (let i = 0; i < 23; i += 1) {
    arr.push(`rgb(0 0 0 / 8%) 0px -3px 18px ${i}px`);
  }

  return arr;
};

export default (type) => {
  const theme = createMuiTheme({
    palette: {
      type,
      background: {
        muted: 'var(--background-muted)',
      },
      primary: {
        main: '#232323',
        dark: '#0A0A0A',
        light: '#0A0A0A',
      },
      secondary: {
        main: '#17cf97',
      },
    },
    typography: {
      h1: {
        ...headingFont,
        fontSize: '2.558rem',
        fontWeight: 600,
      },
      h2: {
        ...headingFont,
        marginTop: 8,
        fontSize: '2.076rem',
      },
      h3: {
        ...headingFont,
        fontSize: '1.87rem',
      },
      h4: {
        ...headingFont,
        fontSize: '1.685rem',
      },
      h5: {
        ...headingFont,
        fontSize: '1.518rem',
        fontWeight: 'bold',
      },
      h6: {
        ...headingFont,
        fontSize: '1.368rem',
      },
      overline: {
        fontSize: '0.731rem !important',
        fontWeight: 800,
        letterSpacing: '0.2px',
      },
      body1: {
        color: 'var(--color-default)',
        '&:not(:last-child)': {
          marginBottom: '1rem',
        },
      },
      body2: {
        fontSize: '1.232rem',
        fontWeight: 400,
      },
      subtitle2: {
        color: 'var(--color-default)',
        fontSize: '1.232rem',
      },
      subtitle1: {
        color: 'var(--color-default)',
        fontSize: '1.368rem',
        fontWeight: 600,
      },
      fontFamily: '"Roboto", sans-serif',
    },
    shadows: generateShadows(),
    spacing: (factor) => `${0.75 * factor}rem`,
  });

  Object.assign(theme, {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '.sb-show-main.sb-main-padded': {
            padding: 0,
          },
          ':root':
            theme.palette.type === 'dark'
              ? {
                  '--background-muted': '#232323',
                  '--color-default': '#fff',
                }
              : {
                  '--background-muted':
                    'rgba(30, 20, 52, 0.08)',
                  '--color-default': '#4f5868',
                },
          body: {
            backgroundColor:
              theme.palette.background.default,
            fontSize: 'initial !important',
          },
          html: {
            fontSize: 'initial !important',
            color,

            '& *::-webkit-scrollbar': {
              height: 8,
              width: 8,
            },

            '& *::-webkit-scrollbar-track': {
              background: theme.palette.background.paper,
            },

            '& *::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: 15,
            },

            '& *::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(0,0,0,0.25)',
            },
          },
          img: {
            maxWidth: '100%',
          },
          small: {
            fontSize: '0.812rem',
          },
        },
      },
      MuiAlert: {
        root: {
          fontSize: '0.901rem !important',
        },
      },
      MuiDialog: {
        scrollPaper: {
          alignItems: 'flex-start',
        },
      },
      MuiLink: {
        root: {
          textDecoration: 'underline !important',
        },
      },
      MuiTextField: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.grey[300],
            },
          },
        },
      },
      MuiPaper: {
        root: {
          color,
        },
      },
      MuiDialogTitle: {
        root: {
          paddingBottom: 0,
        },
      },
      MuiToolbar: {
        dense: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      MuiSnackbarContent: {
        root: {
          width: 350,
          minWidth: '350px !important',
        },
        message: {
          fontSize: '0.911rem',
        },
      },
      MuiSnackbar: {
        root: {
          '& *': {
            fontSize: '0.911rem !important',
          },
        },
      },
      MuiSwitch: {
        colorSecondary: {
          '&.Mui-disabled': {
            color: '#DDD',
          },
        },
      },
      MuiButtonGroup: {
        groupedContainedHorizontal: {
          '&:not(:last-child)': {
            border: '0 !Important',
          },
          '&:last-child': {
            padding: '0 !Important',
          },
        },
      },
      MuiAvatar: {
        root: {
          width: 38,
          height: 38,
        },
      },
      MuiListItemAvatar: {
        root: {
          minWidth: 38,
          margin: '0 .55rem',
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: 38,
        },
      },
      MuiFormControl: {
        root: {
          marginBottom: 4,
          marginTop: 4,
        },
      },
      MuiSvgIcon: {
        root: { fontSize: '1em' },
      },
      MuiIconButton: {
        root: {
          padding: 6,
          fontSize: '1.232rem !important',
        },
        sizeSmall: {
          fontSize: '1rem !important',
        },
      },
      MuiFab: {
        root: {
          fontSize: '1.368rem',
        },
      },
      MuiButton: {
        root: {
          '&.Mui-selected': {
            textDecoration: 'underline',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
      MuiInputAdornment: {
        root: {
          fontSize: '1.232rem !important',
        },
      },
      MuiInputBase: {
        root: {
          marginBottom: 0,
          '&:not(:last-child)': {
            marginBottom: 0,
          },
        },
      },
      MuiTreeItem: {
        root: {
          '&$selected > $content $label': {
            backgroundColor: 'var(--background-muted)',
          },
        },
      },
      MuiTableCell: {
        head: {
          textOverflow: 'ellipsis',
          backgroundColor: `${theme.palette.background.paper} !important`,
          color: grey[700],
          fontSize: '0.75rem !important',
          fontWeight: 600,
          textTransform: 'uppercase',
          lineHeight: '1.5',
        },
        root: {
          overflow: 'hidden',
          padding: '0 8px',
          borderBottom: '2px solid #F5F7F9',
          fontSize: '0.901rem !important',
        },
        sizeSmall: {
          padding: '6px 0px 6px 24px',
        },
      },
      MuiTablePagination: {
        caption: {
          fontSize: '0.901rem',
        },
        spacer: {
          display: 'none',
        },
      },
      MuiStep: {
        horizontal: {
          background: 'transparent',
        },
      },
      MuiBadge: {
        root: {
          '&:not(:first-of-type)': {
            marginLeft: -8,
          },
        },
        badge: {
          background: '#fff',
          height: 16,
          fontSize: 10,
          minWidth: 16,
          top: 'calc(100% - 6px)',
          right: 'calc(100% - 6px)',
        },
      },
      MuiBreadcrumbs: {
        ol: {
          '&:first-child': {
            lineHeight: 0,
          },
        },
        separator: {
          fontSize: 8,
        },
      },
      MuiAutocomplete: {},
      MuiMobileStepper: {
        root: {
          background: '#FFF',
        },
      },
      MuiCheckbox: {
        root: {
          padding: '0 5px',
          marginLeft: 9,
        },
      },
      MuiRadio: {
        root: {
          padding: '0 5px',
          marginLeft: 9,
        },
      },
      MuiFormLabel: {
        root: {
          textTransform: 'initial',
        },
      },
      MuiListItem: {
        root: {
          '&$selected': {
            backgroundColor: 'rgba(30, 20, 52, 0.08)',
          },
        },
        button: {
          '&:hover': {
            backgroundColor: 'rgba(30, 20, 52, 0.08)',
          },
        },
      },
      MuiListItemText: {
        root: {
          '& p, & span': {
            marginBottom: '0 !important',
          },
        },
        primary: {
          fontSize: '1rem',
        },
        secondary: {
          fontSize: '0.812rem',
        },
      },
      MuiListItemSecondaryAction: {},
      MuiExpansionPanel: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#FFF',
          },
        },
      },
      MuiExpansionPanelSummary: {
        root: {
          '&.Mui-disabled': {
            opacity: 1,
          },
        },
      },

      MuiChip: {
        labelSmall: {
          fontSize: '0.659rem',
        },
      },

      MuiTab: {
        root: {
          textTransform: 'none',
        },
      },

      MuiCard: {
        root: {
          transitionDuration: '500ms',
          transitionProperty: 'transform, box-shadow',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow:
              '0 16px 70px -12.125px rgba(0,0,0,0.3)',
          },
          MuiButton: {
            contained: {
              boxShadow: 'none',
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

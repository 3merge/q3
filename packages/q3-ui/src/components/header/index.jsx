import React from 'react';
import PropTypes from 'prop-types';
import { Location, Link } from '@reach/router';
import { get, invoke } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import HeadsetMic from '@material-ui/icons/PermPhoneMsg';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Offcanvas from '../offcanvas';
import Menu from '../menu';
import { LocationMatch } from '../tabs';

const useStyles = makeStyles((theme) => ({
  logoSize: {
    maxHeight: 95,
    maxWidth: 165,
  },
  bar: {
    padding: theme.spacing(3),
  },
  appBar: {
    backgroundColor: (props) =>
      props.background || 'transparent',
    boxShadow: 'none !important',
    padding: theme.spacing(2),
  },
  spacing: {
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  bottomBorder: {
    borderBottom: `2px solid ${grey[200]}`,
  },
  withDividers: {
    '&>:not(:last-child)': {
      marginRight: '2rem',
      position: 'relative',
      padding: '0 2rem 0 0',
      '&::after': {
        backgroundColor: grey[200],
        content: "''",
        display: 'block',
        height: 200,
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 2,
      },
    },
  },
  withoutDividers: {
    '&>*': {
      position: 'relative',
      padding: '0 1rem',
    },
  },
  listContainer: {
    padding: theme.spacing(3),
  },
  list: {
    width: 230,
  },
  phoneText: {
    lineHeight: 1,
    marginLeft: theme.spacing(1),
    textAlign: 'left',
    '&>span': {
      display: 'block',
      lineHeight: 1.1,
      '&:last-child': {
        fontWeight: 'bold',
      },
    },
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: theme.spacing(0.25),
    '& > div': {
      background: theme.palette.primary.main,
      borderRadius: 15,
      maxWidth: theme.spacing(2),
      width: '100%',
    },
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <div /> }}
  />
));

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    lineHeight: 1,
    fontWeight: '600',
    [theme.breakpoints.up('md')]: {
      minWidth: 'none !important',
    },
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HorizontalMenuList = ({ items }) => (
  <LocationMatch views={items}>
    {(value) => (
      <StyledTabs
        value={value}
        aria-label="Main navigation"
        TabIndicatorProps={{ children: <div /> }}
      >
        {items.map(
          ({ to, visible, label }, i) =>
            visible && (
              <StyledTab
                component={Link}
                to={to}
                key={to}
                label={label}
                {...a11yProps(i)}
              />
            ),
        )}
      </StyledTabs>
    )}
  </LocationMatch>
);

HorizontalMenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

HorizontalMenuList.defaultProps = {
  items: [],
};

const FeaturedPhoneNumber = ({ number }) => {
  const { phoneText } = useStyles();
  return (
    <Box>
      <Button disableRipple>
        <HeadsetMic color="secondary" />
        <Box className={phoneText}>
          <Typography component="span" variant="caption">
            Call now
          </Typography>
          <Typography component="span" variant="subtitle1">
            {number}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};

FeaturedPhoneNumber.propTypes = {
  number: PropTypes.string.isRequired,
};

const ToolbarWrapper = ({ children, dividers }) => {
  const { withDividers, withoutDividers } = useStyles();
  return (
    <Grid item>
      <Toolbar
        className={
          dividers ? withDividers : withoutDividers
        }
        style={{
          height: '100%',
        }}
      >
        {children}
      </Toolbar>
    </Grid>
  );
};

ToolbarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dividers: PropTypes.bool,
};

ToolbarWrapper.defaultProps = {
  dividers: false,
};

const Searchbar = ({ visible }) => {
  const [state, setState] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const { bar } = useStyles();

  const open = React.useCallback(() => {
    setState(true);
  }, [state]);

  const close = React.useCallback(() => {
    setState(false);
  }, [state]);

  const onChange = React.useCallback(({ target }) => {
    setTerm(target.value);
  }, []);

  const inputProps = {
    name: 'search',
    type: 'search',
    value: term,
    onChange,
  };

  const renderSearchIcon = (size) => (
    <Tooltip title="Click to enlarge">
      <IconButton onClick={open} size={size}>
        <Search />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      {visible ? (
        <TextField
          {...inputProps}
          id="header-searchbar"
          placeholder="Search"
          variant="outlined"
          margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {renderSearchIcon('small')}
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Box>{renderSearchIcon()}</Box>
      )}

      <Drawer
        anchor="top"
        open={state}
        onOpen={open}
        onClose={close}
        component="aside"
      >
        <Input
          {...inputProps}
          id="fullscreen-searchbar"
          placeholder="Press enter to perform search"
          className={bar}
          autoFocus
        />
      </Drawer>
    </>
  );
};

Searchbar.propTypes = {
  visible: PropTypes.bool,
};

Searchbar.defaultProps = {
  visible: true,
};

const Scroller = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = ({
  logoImgSrc,
  menuItems,
  menuPosition,
  search,
  searchVisible,
  customLogoHeight,
  background,
  color,
  tel,
  ...rest
}) => {
  const { logoSize, appBar } = useStyles();
  const hasMenu = (position) =>
    menuPosition === position && menuItems.length ? (
      <HorizontalMenuList items={menuItems} />
    ) : null;

  return (
    <Location>
      {({ location }) => (
        <Scroller>
          <AppBar
            color={background ? 'inherit' : 'primary'}
            position="fixed"
            className={appBar}
            background={background}
          >
            <Container maxWidth="xl">
              <Grid container justify="space-between">
                <ToolbarWrapper {...rest}>
                  <Link to="/">
                    <img
                      src={logoImgSrc}
                      alt="Logo"
                      className={logoSize}
                      style={{
                        height: customLogoHeight,
                        width: 'auto',
                      }}
                    />
                  </Link>
                  <Hidden smDown>
                    {invoke(rest, 'renderLeft')}
                    {hasMenu('left')}
                  </Hidden>
                </ToolbarWrapper>
                <Hidden smDown>
                  <ToolbarWrapper {...rest}>
                    {hasMenu('right')}
                    {tel && (
                      <FeaturedPhoneNumber number={tel} />
                    )}
                    {search && (
                      <Searchbar visible={searchVisible} />
                    )}
                    {invoke(rest, 'renderRight')}
                  </ToolbarWrapper>
                </Hidden>
                <Hidden smUp>
                  <Offcanvas
                    menu={() => <Menu items={menuItems} />}
                  >
                    {(toggle) => (
                      <Fab onClick={toggle}>
                        <MenuIcon />
                      </Fab>
                    )}
                  </Offcanvas>
                </Hidden>
              </Grid>
            </Container>
          </AppBar>
        </Scroller>
      )}
    </Location>
  );
};

Header.propTypes = {
  logoImgSrc: PropTypes.string.isRequired,
  search: PropTypes.bool,
  searchVisible: PropTypes.bool,
  loginActions: PropTypes.bool,
  renderLeft: PropTypes.func,
  tel: PropTypes.string,
  menuPosition: PropTypes.oneOf(['left', 'right', 'none']),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

Header.defaultProps = {
  renderLeft: null,
  search: false,
  loginActions: false,
  searchVisible: null,
  tel: null,
  menuItems: [],
  menuPosition: 'right',
};

export default Header;

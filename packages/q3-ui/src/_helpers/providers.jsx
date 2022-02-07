import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Locale from 'q3-ui-locale';
import { isString, size } from 'lodash';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  darken,
  lighten,
} from '@material-ui/core';
import Mode from '../Mode';
import baseQ3Theme from '../mui';

import 'moment/locale/fr';
import 'moment/locale/en-ca';

const generateTheme = (color) => {
  if (!isString(color) || !size(color)) return {};
  try {
    return {
      palette: {
        primary: {
          main: darken(color, 0.9),
          light: darken(color, 0.85),
          dark: darken(color, 0.95),
          contrastText: lighten(color, 1),
        },
        secondary: {
          main: color,
          light: lighten(color, 0.75),
          dark: darken(color, 0.35),
          contrastText: lighten(color, 1),
        },
      },
    };
  } catch (e) {
    return {};
  }
};

const Providers = ({
  children,
  initialType,
  enableToggle,
  color,
  theme,
  ...rest
}) => (
  <Locale {...rest}>
    <Mode
      enableToggle={enableToggle}
      initialType={initialType}
    >
      {(type) => (
        <ThemeProvider
          theme={baseQ3Theme(
            merge(theme, generateTheme(color)),
            type,
          )}
        >
          <CssBaseline />
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&Source+Sans+Pro:400&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {children}
        </ThemeProvider>
      )}
    </Mode>
  </Locale>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  initialType: PropTypes.oneOf(['light', 'dark']),
  enableToggle: PropTypes.bool,
  theme: PropTypes.shape({
    // eslint-disable-next-line
    palette: PropTypes.object,
  }),
};

Providers.defaultProps = {
  theme: {},
  initialType: 'light',
  enableToggle: true,
  color: '#49EC1C',
};

export default Providers;

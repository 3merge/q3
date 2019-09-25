import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import theme from '../theme';

export default (story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {story()}
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export const Wrapper = ({ children }) => (
  <Container>
    <Box my={4}>{children}</Box>
  </Container>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

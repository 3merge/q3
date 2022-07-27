import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Fade,
  IconButton,
  Collapse,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useToggle } from 'useful-state';
import WidgetTitle from '../WidgetTitle';

const Widget = ({ children, title, timeout, ...rest }) => {
  const [show, setShow] = React.useState(false);
  const { state: isOpen, toggle } = useToggle(true);
  const ref = React.useRef();

  React.useEffect(() => {
    try {
      setShow(ref.current.hasChildNodes());
    } catch (e) {
      // noop
    }
  }, []);

  return (
    <Fade in={show} timeout={timeout}>
      <Paper
        elevation={0}
        style={{ display: show ? undefined : 'none' }}
        {...rest}
      >
        <Box p={1}>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <WidgetTitle text={title} />
            <IconButton
              aria-label={isOpen ? 'collapse' : 'expand'}
              color="inherit"
              onClick={toggle}
            >
              {isOpen ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={isOpen}>
            <Box ref={ref}>{children}</Box>
          </Collapse>
        </Box>
      </Paper>
    </Fade>
  );
};

Widget.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  title: PropTypes.string.isRequired,
  timeout: PropTypes.number,
};

Widget.defaultProps = {
  children: null,
  timeout: 0,
};

export default Widget;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import MoreVert from '@material-ui/icons/MoreHoriz';
import Close from '@material-ui/icons/Close';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useToggle } from 'useful-state';
import Button from '@material-ui/core/Button';
import useStyle from './useStyle';

const SidebarDrawer = ({ children }) => {
  const classes = useStyle();
  const { state, toggle, close } = useToggle();
  const { t } = useTranslation('labels');

  return (
    <SwipeableDrawer
      anchor="bottom"
      variant="permanent"
      open={state}
      onClose={close}
      swipeAreaWidth={50}
      ModalProps={{
        disablePortal: true,
        keepMounted: true,
        disableBackdropTransition: true,
      }}
      PaperProps={{
        className: classes.paper,
      }}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: state,
        [classes.drawerClose]: !state,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: state,
          [classes.drawerClose]: !state,
        }),
      }}
    >
      <Button
        fullWidth
        onClick={toggle}
        className={classes.launch}
      >
        {state ? <Close /> : <MoreVert />}
        {state ? t('close') : t('more')}
      </Button>
      {children}
    </SwipeableDrawer>
  );
};

SidebarDrawer.propTypes = {
  /**
   * Displays in the first tab, underneath the standard meta information.
   */
  children: PropTypes.node.isRequired,
};

export default SidebarDrawer;

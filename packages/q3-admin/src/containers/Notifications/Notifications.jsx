import React from 'react';
import NotificationsUi from 'q3-ui-notifications';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import NotificationsButton from '../NotificationsButton';
import useNotificationsPage from '../../hooks/useNotificationsPage';
import useStyle from './styles';

const Notifications = () => {
  const { visit } = useNotificationsPage();
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Dialog
      anchor="right"
      className={cls.root}
      closeOnRouteChange
      renderContent={() => (
        <>
          <NotificationsUi />
          <Box py={1} px={2}>
            <Button
              color="secondary"
              onClick={visit}
              fullWidth
              variant="contained"
            >
              {t('seeAllNotifications')}
            </Button>
          </Box>
        </>
      )}
      renderTrigger={(onClick) => (
        <NotificationsButton onClick={onClick} />
      )}
      title="notifications"
      variant="drawer"
    />
  );
};

export default Notifications;

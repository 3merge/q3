import React from 'react';
import PropTypes from 'prop-types';
import Bell from '../Bell';
import NotificationsDrawer from '../NotificationsDrawer';
import NotificationsList from '../NotificationsList';
import useNotificationClickEvent from '../useNotificationClickEvent';
import useCount from '../useCount';

const Notifications = ({
  buttonComponent,
  data,
  error,
  loading,
  syncSeen,
  ...rest
}) => {
  useNotificationClickEvent(data, syncSeen);

  const count = useCount(data);
  const buttonComponentProps = {
    ...count,
    error,
    loading,
  };

  const icon = React.useCallback(
    () => React.createElement(Bell, buttonComponentProps),
    [buttonComponentProps],
  );

  return (
    <NotificationsDrawer
      renderContent={() => (
        <NotificationsList
          {...rest}
          data={data}
          error={error}
          loading={loading}
        />
      )}
      SlideProps={{
        onExit: syncSeen,
      }}
      renderTrigger={(open) =>
        React.cloneElement(
          buttonComponent({
            icon,
            ...buttonComponentProps,
          }),
          {
            onClick: open,
          },
        )
      }
    />
  );
};

Notifications.propTypes = {
  buttonComponent: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      hasBeenDownloaded: PropTypes.bool,
      hasSeen: PropTypes.bool,
      acknowledge: PropTypes.func,
      url: PropTypes.string,
    }),
  ),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  syncSeen: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  data: [],
  loading: false,
  error: false,
};

export default Notifications;

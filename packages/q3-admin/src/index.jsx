import React from 'react';
import EmailEditor from 'q3-ui-emaileditor';
import QueueLogs from 'q3-ui-queuelogs';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { get, map } from 'lodash';
import App from './components/app';
import FloatingAction from './components/FloatingAction';
import {
  usePages,
  useServerSideEvents,
  useProfileTimezone,
  useProfileLocale,
  useProfileTheme,
} from './hooks';
import BackProvider from './containers/BackProvider';
import Domain from './containers/Domain';
import DomainI18n from './containers/DomainI18n';
import DomainProvider from './containers/DomainProvider';
import DomainChangeManifest from './containers/DomainChangeManifest';
import DomainChangeBrowser from './containers/DomainChangeBrowser';
import DomainChangePolicies from './containers/DomainChangePolicies';
import Profile from './containers/Profile';
import ProfileChangeContact from './containers/ProfileChangeContact';
import ProfileChangeLocale from './containers/ProfileChangeLocale';
import ProfileChangeNotifications from './containers/ProfileChangeNotifications';
import ProfileChangePassword from './containers/ProfileChangePassword';
import ProfileChangeTheme from './containers/ProfileChangeTheme';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import Navbar from './components/Navbar';
import NavbarList from './components/NavbarList';
import SystemPage from './components/SystemPage';
import SystemPageSub from './components/SystemPageSub';
import Toolbar from './components/Toolbar';

export { getDomain } from './hooks/useDomain';
export * from './containers';
export * from './hooks';

const EmailModule = React.memo(() => (
  <SystemPageSub title="emailEditor" maxWidth="xl">
    <EmailEditor />
  </SystemPageSub>
));

const QueueModule = React.memo(() => (
  <SystemPageSub title="queuelogs" maxWidth="xl">
    <QueueLogs />
  </SystemPageSub>
));

const Admin = ({ AppProps }) => {
  const { pages } = AppProps;
  const cls = useStyle();

  useProfileLocale();
  useProfileTimezone();
  useProfileTheme();
  useServerSideEvents();

  const customDomainPages = get(
    AppProps,
    'domainPages',
    [],
  );

  const customProfilePages = get(
    AppProps,
    'profilePages',
    [],
  );

  return (
    <DomainProvider
      directory={get(AppProps, 'directory', '/')}
    >
      <BackProvider>
        <Viewport>
          <Navbar>
            <NavbarList items={usePages(pages)} />
          </Navbar>
          <Box className={cls.main}>
            <Toolbar />
            <FloatingAction
              {...get(AppProps, 'floatingActionProps', {})}
            />
            <App {...AppProps}>
              <SystemPage path="account">
                <ProfileChangeContact path="contact" />
                <ProfileChangeLocale path="locale" />
                <ProfileChangeTheme path="theme" />
                <ProfileChangeNotifications path="notifications" />
                <ProfileChangePassword path="password" />
                {map(
                  customProfilePages,
                  ({
                    component: ProfilePageComponent,
                    path,
                  }) => (
                    <ProfilePageComponent
                      key={path}
                      path={path}
                    />
                  ),
                )}
                <Profile
                  items={customProfilePages}
                  default
                />
              </SystemPage>
              <SystemPage path="system">
                <DomainChangeBrowser path="browser" />
                <DomainChangeManifest path="manifest" />
                <DomainChangePolicies path="policies" />
                <DomainI18n path="i18n" />
                <EmailModule path="emails" />
                <QueueModule path="queues" />
                {map(
                  customDomainPages,
                  ({
                    component: DomainPageComponent,
                    path,
                  }) => (
                    <DomainPageComponent
                      key={path}
                      path={path}
                    />
                  ),
                )}
                <Domain items={customDomainPages} default />
              </SystemPage>
            </App>
          </Box>
        </Viewport>
      </BackProvider>
    </DomainProvider>
  );
};

Admin.propTypes = {
  AppProps: PropTypes.shape({
    directory: PropTypes.string,
    pages: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]),
    ),
    profilePages: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        text: PropTypes.string,
        to: PropTypes.string,
      }),
    ),
  }).isRequired,
};

Admin.defaultProps = {};

export default Admin;

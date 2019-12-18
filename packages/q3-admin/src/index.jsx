import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Router } from '@reach/router';
import Providers from 'q3-ui';
import {
  Login as LoginPreset,
  PasswordReset as PasswordResetPreset,
  Reverify as ReverifyPreset,
  Verify as VerifyPreset,
} from 'q3-ui-forms/lib/presets';
import SnackbarProvider from 'q3-ui-forms';
import Authentication, {
  destroySession,
} from 'q3-ui-permissions';
import {
  App,
  LinkTo,
  Loader,
  Main,
  Menu,
  Public,
} from './components';

const Login = () => (
  <LoginPreset>
    <LinkTo destination="password-reset" />
  </LoginPreset>
);

const PasswordReset = () => (
  <PasswordResetPreset>
    <LinkTo destination="login" />
  </PasswordResetPreset>
);

const Verify = () => (
  <VerifyPreset>
    <LinkTo destination="reverify" />
  </VerifyPreset>
);

const Reverify = () => (
  <ReverifyPreset>
    <LinkTo destination="verify" />
  </ReverifyPreset>
);

export const ApplicationGate = ({
  pages,
  popoutMenuItems,
  postAuthVerification,
  ...rest
}) => (
  <>
    <Loader />
    <Authentication
      renderPrivate={(args) => {
        if (postAuthVerification) {
          postAuthVerification(args);
        }

        const { firstName, photo } = args;
        return (
          <Main
            renderAside={() => <Menu pages={pages} />}
            render={() => <App pages={pages} />}
            ProfileBarProps={{
              offcanvas: () => <Menu pages={pages} />,
              name: firstName,
              imgSrc: photo,
              menuItems: [
                ...popoutMenuItems,
                {
                  onClick: destroySession,
                  label: 'Logout',
                },
              ],
            }}
          />
        );
      }}
      renderPublic={() => (
        <Public {...rest}>
          <Router>
            <Login path="/login" />
            <PasswordReset path="/password-reset" />
            <Verify path="/verify" />
            <Reverify path="/reverify" />
            <Redirect noThrow from="/*" to="login" />
          </Router>
        </Public>
      )}
    />
  </>
);

ApplicationGate.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
  postAuthVerification: PropTypes.func,
  pages: PropTypes.arrayOf(PropTypes.object),
  popoutMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

ApplicationGate.defaultProps = {
  popoutMenuItems: [],
  postAuthVerification: null,
  pages: [],
};

const AppWrapper = ({ children }) => (
  <Providers>
    <SnackbarProvider>{children}</SnackbarProvider>
  </Providers>
);

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;

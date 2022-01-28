import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';
import axios from 'axios';
import users from './users';

const profile = {
  ...users[0],
  role: 'Developer',
};

const genPermission = (rest) => ({
  ownership: 'Any',
  fields: '*',
  ...rest,
});

const setupProfilePermissions = (coll) => [
  genPermission({
    op: 'Read',
    coll,
    inClient: true,
  }),
  genPermission({ op: 'Update', coll }),
  genPermission({ op: 'Create', coll }),
  genPermission({ op: 'Delete', coll }),
];

const StoriesApiMockAuthentication = ({ children }) => {
  const [filters, setFilters] = React.useState({});
  const [session, setSession] = React.useState(profile);
  const characters = setupProfilePermissions('characters');
  const shows = setupProfilePermissions('shows');
  const emails = setupProfilePermissions('emails');
  const audit = setupProfilePermissions('audit');
  const tools = setupProfilePermissions('developer-tools');

  return (
    <AuthContext.Provider
      value={{
        update: (data, done) => {
          setFilters(data.filters);
          return axios
            .post('/profile', {
              ...session,
              ...data,
            })
            .then((r) => {
              setSession(r.data.profile);
            })
            .then(() => done());
        },
        state: {
          init: true,
          profile: session,
          permissions: [
            ...characters,
            ...shows,
            ...emails,
            ...audit,
            ...tools,
            {
              op: 'Create',
              coll: 'profile',
              fields: ['filters*'],
            },
          ],
          filters,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

StoriesApiMockAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoriesApiMockAuthentication;

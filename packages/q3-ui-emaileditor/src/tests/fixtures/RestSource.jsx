/* eslint-disable react/prop-types */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last } from 'lodash';
import mjml1 from './data/template1';
import mjml2 from './data/template2';

const emails = [
  {
    'id': '1',
    'name': '__header',
    'mjml': mjml2,
  },
  {
    'id': '2',
    'name': '__footer',
    'mjml': '',
  },
  {
    'id': '3',
    'name': 'welcome',
    'mjml': mjml1,
  },
];

export const defineMockRoutes = (options = {}) => (m) => {
  const { causeError = false } = options;

  m.onPost(/emails-preview/).reply(async () => {
    return [
      200,
      {
        html: '<p>Preview</p>',
      },
    ];
  });

  m.onGet(/emails/).reply(async () => {
    if (causeError) return [500];
    return [
      200,
      {
        emails,
      },
    ];
  });

  m.onPatch(/emails/).reply(async (data) => {
    const id = last(data.url.split('/'));
    const { mjml } = JSON.parse(data.data);

    return [
      200,
      {
        email: {
          id,
          ...emails.find((item) => item.id === id),
          mjml,
        },
      },
    ];
  });
};

export default ({ delay = 1000, children, ...props }) => (
  <Rest define={defineMockRoutes(props)} delay={delay}>
    {children}
  </Rest>
);

import React from 'react';
import { string } from 'q3-ui-helpers';
import { castToLocalDateTime } from 'q3-ui-forms/lib/helpers';
import { connect } from '../../../src/containers';

import {
  PatternContainer,
  PatternFormDialog,
  PatternList,
  PatternMap,
  PatternDataGrid,
} from '../../../src/components';

export default connect(() => (
  <PatternContainer>
    <PatternMap />
    <PatternFormDialog
      FormProps={{
        debug: true,
        modify: {
          createdAt: [castToLocalDateTime],
        },
      }}
      fields={[
        {
          field: 'name',
          type: 'text',
        },
        {
          label: 'Address',
          formatter: 'address',
        },
        {
          field: 'streetNumber',
          type: 'number',
          formOnly: true,
          required: true,
        },
        {
          field: 'streetLine1',
          type: 'text',
          formOnly: true,
          required: true,
        },
        {
          field: 'streetLine2',
          type: 'text',
          formOnly: true,
        },
        {
          field: 'city',
          type: 'text',
          formOnly: true,
          required: true,
        },
      ]}
      title="Billing"
    />

    <PatternDataGrid
      title="Recent appearances"
      report="appearances"
    />
    <PatternList
      apiParams={() => ({
        key: 'show',
        pluralized: 'shows',
        url: '/shows',
      })}
      renderListItem={({ id, name, boxOffice }) => ({
        title: name,
        description: string.toPrice(boxOffice),
        href: `/shows/${id}`,
      })}
      title="Related"
    />
  </PatternContainer>
));

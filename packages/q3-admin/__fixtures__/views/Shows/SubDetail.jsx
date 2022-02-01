import React from 'react';
import { SubDetail } from 'q3-admin';
import { Builders } from 'q3-ui-forms';

const SubDetailForm = (props) => (
  <Builders.Form {...props} keep={['title']}>
    <Builders.Field name="title" />
  </Builders.Form>
);

export default (props) => (
  <SubDetail
    {...props}
    th="seasons"
    root="seasons"
    cardProps={{
      title: 'title',
    }}
    initialValues={{
      title: '',
    }}
  >
    <SubDetailForm />
  </SubDetail>
);

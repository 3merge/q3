import React from 'react';
import Field from './field';
import Form, { FormBuilder } from './form';

const onSubmit = (values) => {
  // eslint-disable-next-line
  console.log(values)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const onReset = () => {
  // eslint-disable-next-line
  alert('Reset!');
};

export default {
  title: 'Forms/Builders/Form',
  parameters: {
    component: FormBuilder,
    componentSubtitle:
      'Easily handle form validation and authorization state',
  },
};

export const DefaultForm = () => (
  <Form
    debug
    isNew
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      name: '',
    }}
  >
    <Field name="name" type="text" required />
  </Form>
);

export const DelayedFormValues = () => {
  const [name, setName] = React.useState('');
  const [lang, setLang] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setName('Joe');
      setLang('en');
    }, 150);
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      initialValues={{
        name,
        lang,
      }}
    >
      <Field name="name" type="text" />
      <Field
        name="lang"
        type="select"
        options={[{ label: 'English', value: 'en' }]}
      />
    </Form>
  );
};

export const WithDebug = () => (
  <Form
    debug
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
  </Form>
);

export const WithCustomButtonLabels = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    submitLabel="add"
    resetLabel="startOver"
    enableReset
    initialValues={{
      trips: '',
    }}
  >
    <Field
      collapse={false}
      name="trips"
      type="radio"
      options={[
        {
          value: 'adventure',
          label: 'adventure',
          vars: {
            type: 'Park',
          },
        },
        { value: 'resort', label: 'Resort' },
      ]}
      required
    />
  </Form>
);

export const WithoutDefaultButtons = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    enableReset={false}
    enableSubmit={false}
    initialValues={{
      favouriteColors: '',
    }}
  >
    <Field
      name="favouriteColors"
      type="checkset"
      options={[
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ]}
    />
  </Form>
);

export const WithAutosave = () => (
  <Form
    initialStatus="autosave"
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
    <Field
      name="favouriteColors"
      type="checkset"
      options={[
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ]}
    />
  </Form>
);

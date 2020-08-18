import React from 'react';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { useTranslation } from 'react-i18next';
import { PhotoUpload } from 'q3-ui-filemanager';
import TemplateGrid from '../../components/TemplateGrid';
import FeaturedPhoto from '../FeaturedPhoto';

export const generateInitialValues = (
  state,
  additionalKeys = [],
) => {
  const keys = [
    'id',
    'email',
    'firstName',
    'lastName',
    ...additionalKeys,
  ];

  return pick(
    get(
      state,
      'profile',
      keys.reduce((acc, next) =>
        Object.assign(acc, {
          [next]: '',
        }),
      ),
    ),
    keys,
  );
};

const Profile = ({ fields, fieldKeys, formProps }) => {
  const { t } = useTranslation();
  const { state, update } = React.useContext(AuthContext);
  const src = get(state, 'profile.photo', null);

  const initialValues = generateInitialValues(
    state,
    fieldKeys,
  );

  return (
    <TemplateGrid
      title={t('titles:profile')}
      subtitle={t('descriptions:profile')}
      asideComponent={
        <FeaturedPhoto
          src={src}
          update={update}
          component={PhotoUpload}
        />
      }
    >
      <Form
        {...formProps}
        showSuccessMessage
        initialValues={initialValues}
        onSubmit={(values) =>
          update(values).then(() => ({
            message: t('descriptions:profileUpdated'),
          }))
        }
      >
        <Field name="firstName" type="text" required />
        <Field name="lastName" type="text" required />
        <Field name="email" type="email" required />
        {fields}
      </Form>
    </TemplateGrid>
  );
};

Profile.propTypes = {
  fields: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  fieldKeys: PropTypes.arrayOf(PropTypes.string),
  formProps: PropTypes.shape({
    // eslint-disable-next-line
    marshal: PropTypes.object,
    // eslint-disable-next-line
    translate: PropTypes.object,
    marshalSelectively: PropTypes.bool,
  }),
};

Profile.defaultProps = {
  fields: null,
  fieldKeys: [],
  formProps: {},
};

export default Profile;

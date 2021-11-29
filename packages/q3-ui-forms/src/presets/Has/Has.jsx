import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import Field from '../../builders/Field';

const Has = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Field
      {...props}
      type="group"
      options={[
        {
          label: t('yes'),
          value: 'has(true)',
        },
        {
          label: t('no'),
          value: 'has(false)',
        },
        {
          label: t('either'),
          value: '',
        },
      ]}
    />
  );
};

export default Has;

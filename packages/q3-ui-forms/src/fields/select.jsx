import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';

export const SelectWrapper = ({
  name,
  label,
  children,
  helperText,
  ...rest
}) => (
  <FormControl variant="filled" fullWidth {...rest}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    {children}
    <Collapse in={Boolean(helperText)}>
      <FormHelperText>{helperText}</FormHelperText>
    </Collapse>
  </FormControl>
);

SelectWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SelectWrapper.defaultProps = {
  helperText: null,
};

const NativeSelect = (props) => {
  const { t } = useTranslation();
  const deco = useDecorator(props);
  const {
    label,
    helperText,
    disabled,
    readOnly,
    onChange,
    name,
    value,
    error,
    required,
  } = deco;

  const { loading, items } = useOptions({
    loadOptionsPlainly: true,
    ...deco,
  });

  return (
    <SelectWrapper
      name={name}
      label={label}
      helperText={helperText}
      error={Boolean(error)}
      required={required}
    >
      <Select
        native
        disableUnderline
        onChange={onChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
      >
        <option>
          {loading
            ? `${t('labels:loading')}...`
            : t('labels:none')}
        </option>
        {items.map((obj) => (
          <option key={obj.value} value={obj.value}>
            {t(`labels:${obj.label}`)}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default NativeSelect;

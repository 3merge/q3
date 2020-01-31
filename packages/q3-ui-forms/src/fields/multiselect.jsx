import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { SelectWrapper } from './select';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';

const Multiselect = (props) => {
  const {
    name,
    label,
    helperText,
    onArrayPush,
    readOnly,
    disabled,
    error,
    value = [],
  } = useDecorator(props);

  const v = Array.isArray(value) ? value.flat() : [];
  const { t } = useTranslation();
  const { loading, items } = useOptions(props);

  return (
    <SelectWrapper
      name={name}
      label={label}
      helperText={helperText}
      error={error}
    >
      <Select
        multiple
        readOnly={readOnly}
        disabled={disabled}
        error={error}
        value={v}
        onChange={onArrayPush}
        input={
          <FilledInput
            disableUnderline
            endAdornment={
              loading && (
                <CircularProgress
                  size={18}
                  style={{ marginRight: 15 }}
                />
              )
            }
          />
        }
        MenuProps={{
          PaperProps: {
            elevation: 3,
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        renderValue={(selected) => selected.join(', ')}
      >
        {items.map((obj) => (
          <MenuItem
            key={obj.value}
            value={obj.value}
            style={{ margin: 0, padding: 0 }}
          >
            <Checkbox checked={v.indexOf(obj.value) > -1} />
            <ListItemText
              primary={t(`labels:${obj.label}`, obj.vars)}
            />
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default Multiselect;

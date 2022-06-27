import React from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Grid, Chip } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useRegisterActions } from '../../hooks';
import useStyle from './styles';

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const options = useRegisterActions(registerOptions);

  const navigate = useNavigate();
  const renderLabel = (option) => (
    <span>
      <strong>{t(option.title)}</strong>{' '}
      {t(option.description)}
    </span>
  );

  return (
    <Grid
      container
      component="ul"
      className={cls.list}
      spacing={0}
    >
      {map(sortBy(options, 'href'), (option) => (
        <Grid
          item
          className={cls.listItem}
          component="li"
          key={option.title}
        >
          {option.href ? (
            <Chip
              className={cls.chip}
              label={renderLabel(option)}
              icon={<CallMadeIcon />}
              onClick={() => {
                navigate(option.href);
              }}
              size="small"
              variant="outlined"
            />
          ) : (
            <Chip
              className={cls.chip}
              label={renderLabel(option)}
              size="small"
              variant="outlined"
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;

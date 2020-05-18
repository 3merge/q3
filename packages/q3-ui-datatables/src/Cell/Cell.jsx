import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { string } from 'q3-ui-helpers';
import { Dot, Helper, Status } from 'q3-components';
import CellExpansion from '../CellExpansion';

const Cell = ({ id, value, className, ...props }) => {
  const { t } = useTranslation('labels');
  let formatted = value;

  if (
    value !== null &&
    typeof value === 'object' &&
    'base' in value
  ) {
    if (value.base) {
      const args =
        typeof value.renderProps === 'function'
          ? value.renderProps(value)
          : value.renderProps;

      if (value.toString) formatted = String(value.base);

      if (value.toTruthy)
        formatted = string.toTruthy(value.base, t);
      if (value.toDate)
        formatted = string.toDate(value.base);
      if (value.toPrice)
        formatted = string.toPrice(value.base);
      if (value.trans) formatted = t(value.base);

      if (value.toChip)
        formatted = <Status label={formatted} {...args} />;

      if (value.toDot)
        formatted = <Dot label={formatted} {...args} />;

      if (value.helperText)
        formatted = (
          <Helper
            label={formatted}
            helperText={value.helperText}
          />
        );

      if (value.toAction)
        formatted = (
          <IconButton
            color="secondary"
            size="small"
            {...args}
          >
            {React.createElement(value.icon)}
          </IconButton>
        );
    } else {
      formatted = '--';
    }
  }

  return (
    <TableCell {...props}>
      <CellExpansion id={id} className={className}>
        {formatted}
      </CellExpansion>
    </TableCell>
  );
};

export default Cell;

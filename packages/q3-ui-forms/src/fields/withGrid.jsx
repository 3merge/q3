import React from 'react';
import Grid from '@material-ui/core/Grid';

export default (Component, sizes) =>
  React.forwardRef(
    ({ xl = 4, lg = 6, md = 12, ...rest }, ref) => (
      <Grid
        item
        {...{ xl, lg, md, ...sizes }}
        sm={12}
        xs={12}
        ref={ref}
      >
        <Component {...rest} />
      </Grid>
    ),
  );

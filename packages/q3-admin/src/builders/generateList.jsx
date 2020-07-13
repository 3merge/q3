import React from 'react';
import { Add, Table } from '../containers';

export default ({
  addComponent: AddForm,
  filterComponent: FilterForm,
  onNew,
  ...rest
}) => (props) => (
  <>
    <Table
      {...rest}
      {...props}
      addComponent={
        AddForm ? (
          <Add onComplete={onNew}>
            <AddForm />
          </Add>
        ) : null
      }
      filterComponent={FilterForm ? <FilterForm /> : null}
    />
  </>
);

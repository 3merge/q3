import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getForAutocomplete, useFilters } from 'q3-ui-rest';
import SearchBar from 'q3-ui/lib/searchBar';
import Context from './state';
import { isArray } from './utils';
import SearchIcon from '../images/search';

const assignAsEnumValues = (a, b) =>
  Object.entries(a).reduce(
    (curr, [key, value]) =>
      Object.assign(curr, {
        [key]: {
          enum: get(b, `fields.${key}`, []),
          ...value,
        },
      }),
    {},
  );

const makeFields = (children) =>
  isArray(children).reduce(
    (a, child) =>
      Object.assign(a, {
        [child.props.include]: { type: child.props.type },
      }),
    {},
  );

export const FilterForm = ({
  collectionName,
  fields,
  filters,
}) => (
  <FromJson
    formik={{}}
    json={{
      collectionName,
      bypassAuthorization: true,
      fields: assignAsEnumValues(fields, filters),
    }}
  />
);

FilterForm.propTypes = {
  collectionName: PropTypes.string.isRequired,
  fields: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
};

const Search = ({ children, intercept }) => {
  const keys = isArray(children)
    .map((child) => child.props.include)
    .filter(Boolean);

  const initialValues = keys.reduce(
    (a, item) => Object.assign(a, { [item]: '' }),
    {},
  );

  const { collectionName, resourceName } = React.useContext(
    Context,
  );

  const filters = keys.length
    ? useFilters({
        coll: collectionName,
        fields: keys,
      })
    : null;

  return (
    <SearchBar
      expanded
      icon={SearchIcon}
      getResults={(e) =>
        getForAutocomplete(
          `/${collectionName}?search=${e}&limit=25`,
          resourceName,
        ).then((r) => {
          return intercept ? intercept(r) : r;
        })
      }
    />
  );
};

Search.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

Search.defaultProps = {
  children: [],
};

export default Search;

import React from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import Fade from '@material-ui/core/Fade';
import Graphic from 'q3-ui-assets';
import { useFilters } from 'q3-ui-rest';
import Loading from '../../components/loading';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore, useViewResolutions } from '../use';
import withSorting from './withSorting';
import withActiveFilter from './withActiveFilter';

const PageChildren = ({
  children,
  id,
  hasEntered,
  fetching,
  fetchingError,
  loadingComponent,
}) =>
  !hasEntered || fetching ? (
    <Fade in>
      {loadingComponent || <Loading id={id} />}
    </Fade>
  ) : (
    <Fade in>
      <Box>
        {fetchingError ? (
          <Box m={4}>
            <Graphic title="error" icon="Error" />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Fade>
  );

PageChildren.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  hasEntered: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchingError: PropTypes.bool.isRequired,
};

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

export const executeOnChildren = (children, args = {}) =>
  typeof children === 'function'
    ? children(args)
    : children;

const Page = ({
  children,
  select,
  id,
  location,
  onEnter,
  onExit,
  onInit,
  viewResolutions,
  loadingComponent,
  lookup,
  runOnSearch,
}) => {
  const {
    resourceNameSingular,
    collectionName,
    resourceName,
  } = React.useContext(Definitions);
  const url = slugify(collectionName, id);

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    select,
    runOnInit: true,
    location,
    url,
  });

  const { fetching, fetchingError } = state;

  const data = useDataStore({
    resourceNameSingular,
    resourceName,
    state,
    id,
  });

  const filters = useFilters({
    query: runOnSearch ? get(location, 'search', '') : null,
    fields: lookup,
    coll: collectionName,
    location,
  });

  const hasEntered = useOnRender(
    { onEnter, onExit, onInit },
    { ...state, url },
  );

  const exclusions = useViewResolutions(
    viewResolutions,
    data,
  );

  return (
    <PageChildren
      hasEntered={hasEntered}
      fetching={fetching}
      fetchingError={fetchingError}
      loadingComponent={loadingComponent}
      id={id}
    >
      <Dispatcher.Provider
        value={{
          exclusions,
          ...pick(state, [
            'get',
            'poll',
            'remove',
            'removeBulk',
            'patch',
            'put',
            'post',
          ]),
        }}
      >
        <Store.Provider
          value={{
            filters,
            data,
            ...pick(state, [
              'total',
              'hasNextPage',
              'hasPrevPage',
            ]),
          }}
        >
          {executeOnChildren(children, {
            ...state,
            id,
            data,
          })}
        </Store.Provider>
      </Dispatcher.Provider>
    </PageChildren>
  );
};

Page.propTypes = {
  /**
   * A hook fired as the component mounts.
   * This is a render blocking callback.
   */
  onEnter: PropTypes.func,

  /**
   * A hook fired before the component unmounts.
   */
  onExit: PropTypes.func,

  /**
   * A hook fired on first paint.
   */
  onInit: PropTypes.func,

  /**
   * The page internals.
   */
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,

  /**
   * This value is appended to "collectionName" for document-specific queries.
   */
  id: PropTypes.string,

  /**
   * Location props passed via @reach/router
   */
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,

  /**
   * Reduce payload by projecting which fields to include.
   */
  select: PropTypes.string,

  /**
   * Used to hide/display tabs based on state or role.
   */
  viewResolutions: PropTypes.shape({}),

  lookup: PropTypes.arrayOf(PropTypes.string),
  loadingComponent: PropTypes.node,
};

Page.defaultProps = {
  id: null,
  onExit: null,
  onEnter: null,
  onInit: null,
  select: null,
  viewResolutions: {},
  lookup: [],
  loadingComponent: null,
};

export default withActiveFilter(withSorting(Page));

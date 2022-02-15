import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import {
  get,
  compact,
  map,
  flatten,
  groupBy,
  merge,
  filter,
  isFunction,
} from 'lodash';
import { makePath } from '../components/app';

export default (pages = []) => {
  const { t } = useTranslation('labels');
  const { state } = React.useContext(AuthContext);

  const assignSegments = (xs) =>
    compact(
      flatten(
        map(xs, (page) => {
          if (!page?.index) return null;
          return page;
        }),
      ),
    );

  const processSegments = (xs) =>
    isFunction(xs) ? xs(state?.profile) : xs;

  const makePage = (page) => ({
    ...page,
    label: t(page.resourceName),
    segments: merge(
      {},
      processSegments(page.segments),
      get(state, `profile.filters.${page.collectionName}`),
    ),
    to: makePath(page),
    visible: page.collectionName
      ? useAuth(page.collectionName)?.inClient
      : true,
  });

  return groupBy(
    filter(map(assignSegments(pages), makePage), 'visible'),
    (v) => v.parent,
  );
};

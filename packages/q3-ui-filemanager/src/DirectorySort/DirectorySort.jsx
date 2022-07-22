import React from 'react';
import { get, orderBy } from 'lodash';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import CheckIcon from '@material-ui/icons/Check';
import { browser } from 'q3-ui-helpers';
import useDirectoryFolders from '../useDirectoryFolders';
import DirectorySortButton from '../DirectorySortButton';
import { getKey, getFromLocalStorage } from '../utils';

export { getKey, getFromLocalStorage };

export const castPropertyToLowerCase =
  (propertyName) => (item) =>
    String(get(item, propertyName)).toLowerCase();

const DirectorySort = ({ children }) => {
  const { files = [], siblings = [] } =
    useDirectoryFolders();

  const { t } = useTranslation();
  const [state, setState] = React.useState({
    property: getFromLocalStorage('property', 'name'),
    sort: getFromLocalStorage('sort', 'asc'),
  });

  const sort = (xs) =>
    orderBy(
      xs,
      [castPropertyToLowerCase(state.property)],
      [state.sort],
    );

  const makeMenuItem = (value, stateKey) => (
    <MenuItem
      dense
      key={stateKey}
      onClick={() => {
        setState((prevState) => ({
          ...prevState,
          [stateKey]: value,
        }));

        browser.proxyLocalStorageApi(
          'setItem',
          getKey(stateKey),
          value,
        );
      }}
    >
      {state[stateKey] === value && <CheckIcon />}
      {t(value)}
    </MenuItem>
  );

  return children(
    {
      files: sort(files),
      siblings: sort(siblings),
    },
    () => (
      <DirectorySortButton>
        {({ anchorEl, isOpen, close }) => (
          <Menu
            anchorEl={anchorEl}
            id="file-sorting"
            open={isOpen}
            onClose={close}
            elevation={5}
          >
            {['updatedAt', 'name', 'size'].map((item) =>
              makeMenuItem(item, 'property'),
            )}
            <Divider component="li" />
            {['asc', 'desc'].map((item) =>
              makeMenuItem(item, 'sort'),
            )}
          </Menu>
        )}
      </DirectorySortButton>
    ),
  );
};

export default DirectorySort;

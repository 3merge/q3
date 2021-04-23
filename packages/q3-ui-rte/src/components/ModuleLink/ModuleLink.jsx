import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import { Link as LinkIcon } from '@material-ui/icons';
import { isObject, size } from 'lodash';
import Quill from 'quill';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Popover from '../Popover';
import PopoverTextField from '../PopoverTextField';
import PopoverSave from '../PopoverSave';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ModuleLink = React.forwardRef(
  (
    { component: Component, selection, captureSelection },
    ref,
  ) => {
    const matches = useMediaQuery('(min-width:600px)');

    const hyperlink = (state, forwardedSelection) => {
      const quill = ref?.current;
      const s = forwardedSelection || selection;

      if (!isObject(s) || !size(state)) return;
      quill.format('link', state, Quill.sources.USER);
      quill.update();
      quill.focus();
      quill.setSelection(s);
    };

    return (
      <Popover
        button={({ onClick }) => {
          const fn = matches
            ? onClick
            : (s) => {
                // eslint-disable-next-line
                hyperlink(prompt(), s);
              };

          return Component ? (
            <Component
              icon={LinkIcon}
              onClick={captureSelection(fn)}
            />
          ) : (
            <IconButton
              label="hyperlink"
              icon={LinkIcon}
              buttonProps={{
                type: 'button',
                onClick: captureSelection(fn),
              }}
            />
          );
        }}
      >
        {(close) => (
          <PopoverTextField>
            {(state) => (
              <PopoverSave
                onClick={(e) => {
                  e.preventDefault();
                  hyperlink(state);
                  close();
                }}
              />
            )}
          </PopoverTextField>
        )}
      </Popover>
    );
  },
);

ModuleLink.propTypes = propTypes;

export default withCurrentSelection(ModuleLink);

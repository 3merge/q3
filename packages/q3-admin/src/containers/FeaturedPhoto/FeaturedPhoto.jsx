import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { Avatar, PhotoUpload } from 'q3-ui-filemanager';
import { makeStyles } from '@material-ui/core';
import { Definitions } from '../state';

const useStyle = makeStyles(() => ({
  picture: {
    width: 95,
    height: 95,
  },
}));

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const FeaturedPhoto = ({
  component: Component,
  field,
  update,
  src,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { canEditSub } = useAuth(collectionName);

  const isFeaturedPhotoImplementation =
    field === FEATURED_UPLOAD_KEY;

  const onDrop = React.useCallback(
    (formData) => {
      if (!isFeaturedPhotoImplementation) {
        const f = formData.get(field);
        const path = `uploads/${f.name}`; // saves to file manager
        formData.append(path, f); // saves as reference to the path
        formData.set(field, f.name); // saves as public
        formData.set('sensitive', false);
      }

      return update(formData);
    },
    [isFeaturedPhotoImplementation],
  );

  return (
    <Component
      src={src}
      disabled={!canEditSub(field)}
      className={useStyle().picture}
      customizer={() => field}
      onDrop={onDrop}
      onDelete={() =>
        update({
          [field]: null,
        })
      }
    />
  );
};

FeaturedPhoto.defaultProps = {
  component: PhotoUpload,
  field: FEATURED_UPLOAD_KEY,
  src: '',
};

FeaturedPhoto.propTypes = {
  component: PropTypes.oneOf([Avatar, PhotoUpload]),
  field: PropTypes.string,
  src: PropTypes.string,
  update: PropTypes.func.isRequired,
};

export default FeaturedPhoto;

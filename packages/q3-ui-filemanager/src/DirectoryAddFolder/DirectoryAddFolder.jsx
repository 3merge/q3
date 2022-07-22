import React from 'react';
import Button from '@material-ui/core/Button';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Dialog from 'q3-ui-dialog';
import { useTranslation } from 'q3-ui-locale';
import DirectoryAddFolderForm from '../DirectoryAddFolderForm';

const DirectoryAddFolder = () => {
  const { t } = useTranslation('labels');

  const ButtonComponent = React.useCallback(
    (open) => (
      <Button
        color="secondary"
        onClick={open}
        startIcon={<CreateNewFolderIcon />}
        variant="contained"
      >
        {t('addFolder')}
      </Button>
    ),
    [],
  );

  const ContentComponent = React.useCallback(
    (close) => <DirectoryAddFolderForm onDone={close} />,
    [],
  );

  return (
    <Dialog
      renderTrigger={ButtonComponent}
      renderContent={ContentComponent}
      title="addFolder"
    />
  );
};

export default DirectoryAddFolder;

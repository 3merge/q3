import React from 'react';
import Thread from 'q3-ui/lib/thread';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import CallToAction from 'q3-ui/lib/callToAction';
import ServerError from 'q3-ui/lib/error';
import { useTranslation } from 'react-i18next';
import Create from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TimelineSkeleton } from 'q3-ui/lib/timeline';
import NotesImage from '../images/note';

export default ({ path }) => {
  const { t } = useTranslation();
  const {
    post,
    remove,
    fetching,
    fetchingError,
    thread = [],
  } = useRest({
    url: `${path}/thread`,
    key: 'thread',
    pluralize: 'thread',
    runOnInit: true,
  });

  const renderNotes = () => {
    if (fetching)
      return (
        <div style={{ marginTop: '1rem' }}>
          <TimelineSkeleton />
        </div>
      );

    if (fetchingError) return <ServerError />;

    if (!thread.length)
      return (
        <Paper style={{ marginTop: '1rem' }}>
          <CallToAction
            title={t('titles:noNotes')}
            description={t('descriptions:noNotes')}
          />
        </Paper>
      );

    return <Thread entries={thread} />;
  };

  return (
    <>
      {!fetchingError && <Box align="right" />}
      {renderNotes()}
    </>
  );
};

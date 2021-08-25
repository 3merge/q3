import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'q3-ui-helpers';
import { Box, Typography } from '@material-ui/core';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import useStyles from './styles';
import Avatar, { makeName } from '../Avatar';

const TimelineEntry = ({
  actions,
  connector,
  createdAt,
  createdBy,
  message,
  children,
  id,
}) => {
  const cls = useStyles({
    connector,
  });

  return (
    <TimelineItem
      id={id ? `comment-${id}` : undefined}
      className={cls.root}
    >
      <TimelineSeparator>
        {connector ? (
          <>
            <TimelineDot />
            <TimelineConnector />
          </>
        ) : (
          <TimelineDot className={cls.dot}>
            <Avatar {...createdBy} />
          </TimelineDot>
        )}
      </TimelineSeparator>
      <TimelineContent>
        <Box mb={1}>
          <Box
            alignItems="center"
            display="flex"
            className={cls.wrap}
          >
            <Typography className={cls.title}>
              <strong>{makeName(createdBy)}</strong>
              <small>{string.toDate(createdAt)}</small>
              {actions}
            </Typography>
          </Box>
          {message && (
            <div
              className={cls.rich}
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: message,
              }}
            />
          )}
          {children}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

TimelineEntry.defaultProps = {
  actions: null,
  connector: false,
  createdAt: undefined,
  createdBy: null,
  message: '',
  children: null,
  id: undefined,
};

TimelineEntry.propTypes = {
  actions: PropTypes.node,
  connector: PropTypes.bool,
  createdAt: PropTypes.string,
  createdBy: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  message: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TimelineEntry;

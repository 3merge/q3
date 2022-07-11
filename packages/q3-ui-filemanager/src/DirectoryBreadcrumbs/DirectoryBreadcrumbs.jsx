import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from '@material-ui/core/Link';
import { isString, map, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';

const DirectoryBreadcrumbs = ({ current, setCurrent }) => {
  const { t } = useTranslation('labels');
  const history = React.useMemo(
    () => (isString(current) ? current.split('.') : []),
    [current],
  );

  const rewriteHistory = (highestIndex = 0) =>
    history.slice(0, highestIndex).join('.') || null;

  const handleHome = () => {
    setCurrent(0);
  };

  const handleBack = () => {
    setCurrent(rewriteHistory(-1));
  };

  const handleClick =
    (idx = 0) =>
    (e) => {
      e.preventDefault();
      setCurrent(rewriteHistory(idx + 1));
    };

  const renderWhenHistoryHasSize = React.useCallback(
    (children) => (size(history) ? children : null),
    [history],
  );

  return (
    <Container>
      <Box alignItems="center" display="flex">
        {renderWhenHistoryHasSize(
          <IconButton color="inherit" onClick={handleBack}>
            <ArrowBackIosIcon />
          </IconButton>,
        )}
        <h2>{t('files')}</h2>
        {renderWhenHistoryHasSize(
          <Box alignItems="center" display="flex" ml={2}>
            <Breadcrumbs aria-label="breadcrumb">
              {/* eslint-disable-next-line */}
              <Link component="button" onClick={handleHome}>
                {t('labels:root')}
              </Link>
              {map(history, (item, idx) =>
                idx === history.length - 1 ? (
                  <strong
                    style={{
                      fontSize: '0.877rem',
                    }}
                  >
                    {item}
                  </strong>
                ) : (
                  // eslint-disable-next-line
                  <Link
                    // eslint-disable-next-line
                    component="button"
                    key={item}
                    onClick={handleClick(idx)}
                  >
                    {item}
                  </Link>
                ),
              )}
            </Breadcrumbs>
          </Box>,
        )}
      </Box>
    </Container>
  );
};

DirectoryBreadcrumbs.defaultProps = {
  current: null,
};

DirectoryBreadcrumbs.propTypes = {
  current: PropTypes.string,
  setCurrent: PropTypes.func.isRequired,
};

export default DirectoryBreadcrumbs;

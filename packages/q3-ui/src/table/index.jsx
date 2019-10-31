import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Location, navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Apps from '@material-ui/icons/Apps';
import { grey } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '../avatar';
import { EmptyGraphic, ErrorGraphic } from '../graphic';

const useStyles = makeStyles(() => ({
  tableRowHover: {
    transition: 'all 500ms',
    '&:nth-child(even)': {
      backgroundColor: grey[100],
    },
    '&>.visible-on-hover': {
      textAlign: 'right',
    },
    '&>.visible-on-hover button': {
      opacity: 0,
      transition: 'opacity 250',
    },
    '&>.visible-on-hover button:focus': {
      opacity: 1,
    },
    '&:hover>.visible-on-hover button': {
      opacity: 1,
    },
  },
}));

const extractId = (obj, i) =>
  typeof obj === 'object' && 'id' in obj ? obj.id : i;

export const TableCellHeader = ({ name, sub, imgSrc }) => (
  <TableCell>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar word={name} imgSrc={imgSrc} />
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          component="span"
          style={{ lineHeight: 1 }}
        >
          <strong>{name}</strong>
          {sub && (
            <div>
              <small>{sub}</small>
            </div>
          )}
        </Typography>
      </Grid>
    </Grid>
  </TableCell>
);

TableCellHeader.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  sub: PropTypes.string,
};

TableCellHeader.defaultProps = {
  sub: null,
  imgSrc: null,
};

export const Templated = ({ root, columns, ...rest }) => {
  const { id } = rest;
  const { tableRowHover } = useStyles();
  const { t } = useTranslation('labels');
  return (
    <TableRow key={id} className={tableRowHover}>
      {columns.map((key) =>
        Array.isArray(key) ? (
          <TableCellHeader
            name={t(get(rest, key[0]))}
            sub={t(get(rest, key[1]))}
            imgSrc={get(rest, key[2])}
            data={rest}
          />
        ) : (
          <TableCell>
            <Typography
              variant="subtitle2"
              component="span"
            >
              {t(get(rest, key))}
            </Typography>
          </TableCell>
        ),
      )}

      <TableCell className="visible-on-hover">
        <Tooltip title={t('view')}>
          <IconButton
            onClick={() => navigate(`${root}/${id}`)}
          >
            <Apps />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

Templated.propTypes = {
  root: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  ).isRequired,
};

const DatalessView = ({
  span,
  children,
  title,
  subtitle,
}) => (
  <TableRow>
    <TableCell colSpan={span}>
      <Box mb={title ? -7 : 0}>{children}</Box>
      {title && (
        <Container maxWidth="xs">
          <Box textAlign="center" pb={3}>
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
            <Typography>{subtitle}</Typography>
          </Box>
        </Container>
      )}
    </TableCell>
  </TableRow>
);

DatalessView.propTypes = {
  children: PropTypes.node.isRequired,
  span: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

DatalessView.defaultProps = {
  title: null,
  subtitle: null,
};

const getDefaultPage = (num, defaultNum = 1) => {
  const paged = parseInt(num, 10);
  return Number.isNaN(paged) ? defaultNum : paged;
};

/**
@TODO FIX
 */

export const TableView = ({
  rows,
  loading,
  error,
  columns,
  total,
  rowTemplate: Row,
  root,
}) => {
  const { t } = useTranslation();
  const [showResults, setShowResults] = React.useState(
    false,
  );

  const handlePageIncrementation = (params) => (e, num) => {
    if (num < 0) return;
    params.set('page', num);
    navigate(`?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  const renderBody = React.useCallback(() => {
    const span = columns.length + 1;

    if (error) {
      return (
        <DatalessView
          span={span}
          title={t('titles:error')}
          subtitle={t('descriptions:error')}
        >
          <ErrorGraphic />
        </DatalessView>
      );
    }

    if (!rows || !rows.length) {
      return (
        <DatalessView
          span={span}
          title={t('titles:empty')}
          subtitle={t('descriptions:empty')}
        >
          <EmptyGraphic />
        </DatalessView>
      );
    }

    return rows.map((props, i) => (
      <Templated
        key={extractId(props, i)}
        root={root || window.location.pathname}
        Component={Row}
        columns={columns}
        {...props}
      />
    ));
  }, [showResults, error, rows]);

  React.useEffect(() => {
    if (!loading) {
      const clear = setTimeout(() => {
        setShowResults(true);
        clearTimeout(clear);
      }, 500);
    }
  }, [loading]);

  return (
    <Paper
      style={{ maxWidth: '100%', overflow: 'auto' }}
      elevation={0}
    >
      {!showResults ? (
        <Box p={3}>
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton width="25%" />
          <Skeleton width="80%" />
          <Skeleton width="42%" />
          <Skeleton width="90%" />
        </Box>
      ) : (
        <Fade in={showResults}>
          <div>
            <Table size="small">
              <TableHead>
                {columns && (
                  <TableRow>
                    {columns.map((key) => (
                      <TableCell key={key[0]}>
                        {t(
                          `labels:${
                            Array.isArray(key)
                              ? key[0]
                              : key
                          }`,
                        )}
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                )}
              </TableHead>
              <TableBody>{renderBody()}</TableBody>
              <TableFooter>
                <TableRow>
                  <Location>
                    {({ location }) => {
                      const params = new URLSearchParams(
                        location.search,
                      );
                      return (
                        <TablePagination
                          page={params.get('page')}
                          rowsPerPageOptions={[]}
                          count={total}
                          rowsPerPage={25}
                          onChangePage={handlePageIncrementation(
                            params,
                          )}
                        />
                      );
                    }}
                  </Location>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Fade>
      )}
    </Paper>
  );
};

TableView.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  rowTemplate: PropTypes.func.isRequired,
  total: PropTypes.number,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ),
};

TableView.defaultProps = {
  loading: false,
  error: false,
  rows: [],
  columns: [],
  total: 0,
};

export default TableView;

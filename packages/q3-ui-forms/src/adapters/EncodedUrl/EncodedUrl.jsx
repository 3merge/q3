import React from 'react';
import { withLocation } from 'with-location';
import PropTypes from 'prop-types';
import flat from 'flat';
import { url } from 'q3-ui-helpers';
import { timezone } from 'q3-ui-locale';
import { Form } from '../../builders';

const getParamName = (v) => {
  const [name] = encodeURIComponent(v)
    .replace(/~/g, '.')
    .split('*');
  return name;
};

const clean = (v) => v.replace(/%20/g, ' ');

const join = (key, value) => {
  if (value.startsWith('=') || value.startsWith('!'))
    return `${key}${value}`;

  return `${key}=${value}`;
};

export const extractValue = (val) => {
  const normalize = (a) =>
    String(typeof a === 'object' ? a.value : a);

  return encodeURIComponent(
    Array.isArray(val)
      ? val.map(normalize).join(',')
      : normalize(val),
  );
};

export const serialize = (o) =>
  Object.entries(flat.unflatten(o))
    .reduce((acc, [key, value]) => {
      if (value === null) return acc;

      const normalized = extractValue(value);
      const hasAsterisk = key.includes('*');
      const name = getParamName(key);

      if (timezone.isYmd(value)) {
        acc.push(join(name, timezone.toUtc(value)));
      } else if (hasAsterisk && normalized === 'true') {
        acc.push(name);
      } else if (
        !hasAsterisk &&
        normalized !== 'undefined' &&
        normalized.length
      ) {
        acc.push(join(name, normalized));
      }

      return acc;
    }, [])
    .join('&');

export const deserialize = (v) => {
  if (!v) return {};

  return url
    .removeLeadingQueryCharacter(v)
    .split('&')
    .reduce((acc, next) => {
      // eslint-disable-next-line
      let [key, value] = next ? next.split('=') : [next];

      if (timezone.isUtc(value))
        value = timezone.toLocal(timezone.YMD);

      if (typeof value === 'string') value = clean(value);
      if (value === undefined) value = true;

      if (String(value).includes('%2C'))
        value = value.split('%2C').map(decodeURIComponent);

      acc[
        decodeURIComponent(key).replace(/\./g, '~')
      ] = Array.isArray(value)
        ? value.map(decodeURIComponent)
        : decodeURIComponent(String(value));

      return acc;
    }, {});
};

export const handleStateEncoding = (onDone) => (values) =>
  onDone(`?${serialize(values)}`);

export const handleStateDecoding = (values, defaults) => ({
  ...defaults,
  ...deserialize(values),
});

export const handleStateClear = (
  values,
  locationUtils,
) => () => {
  const { params, navigate } = locationUtils;

  Object.keys(values)
    .map(getParamName)
    .forEach((v) => params.delete(v));

  return navigate(params.toString());
};

const EncodedUrl = ({
  children,
  navigate,
  location,
  initialValues,
  query,
  withClear,
  onSave,
  ...props
}) => {
  const init = handleStateDecoding(
    // allowed to override with empty string
    query === undefined ? location.search : query,
    initialValues,
  );

  return (
    <Form
      {...props}
      enableSubmit={false}
      onSubmit={handleStateEncoding(onSave || navigate)}
      initialValues={init}
    >
      {children}
    </Form>
  );
};

EncodedUrl.propTypes = {
  children: PropTypes.node.isRequired,
  navigate: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  withClear: PropTypes.bool,
  query: PropTypes.string,
  initialValues: PropTypes.shape({}),
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

EncodedUrl.defaultProps = {
  onSave: null,
  withClear: false,
  query: undefined,
  initialValues: {},
};

/**
 * @NOTE
 * There is some duplication with utilities available through this HOC.
 * Some of this logic is very particular to our implementation, though, so it'll remain separate for now.
 */
export default withLocation(EncodedUrl);

import React from 'react';
import debounce from 'debounce-promise';

export const invoke = (fn, arg) =>
  // eslint-disable-next-line
  Array.isArray(arg) ? fn.apply(null, arg) : fn(arg);

export const isOfAdequateLength = (term, len) => {
  const meetsReq = (v) =>
    typeof v === 'string' && v.length >= len;

  return Array.isArray(term)
    ? meetsReq(term[0])
    : meetsReq(term);
};

export default (
  service,
  term,
  defaultState = [],
  minimumCharacterCount = 2,
) => {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState(
    defaultState,
  );

  const clear = () => setResults([]);

  return {
    run: debounce((state) => {
      if (!isOfAdequateLength(term, minimumCharacterCount))
        return clear();

      setLoading(true);
      return invoke(
        service,
        [].concat([term, state]).flat(),
      )
        .then(setResults)
        .catch(clear)
        .finally(() => {
          setLoading(false);
        });
    }, 75),
    loading,
    results,
    setResults,
  };
};

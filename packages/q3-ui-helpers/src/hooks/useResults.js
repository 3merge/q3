import React from 'react';

export const invoke = (fn, arg) =>
  // eslint-disable-next-line
  Array.isArray(arg) ? fn.apply(null, arg) : fn(arg);

export const isOfAdequateLength = (term) => {
  const meetsReq = (v) =>
    typeof v === 'string' && v.length > 1;

  return Array.isArray(term)
    ? meetsReq(term[0])
    : meetsReq(term);
};

export default (service, term, defaultState = []) => {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState(
    defaultState,
  );

  const clear = () => setResults([]);

  return {
    run: () => {
      if (!isOfAdequateLength(term)) return clear();

      setLoading(true);
      return invoke(service, term)
        .then(setResults)
        .catch(clear)
        .finally(() => {
          setLoading(false);
        });
    },
    loading,
    results,
    setResults,
  };
};

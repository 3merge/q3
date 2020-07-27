import dot from 'dot-helpers';
import { merge } from 'lodash';
import flat from 'flat';
import InitialValuesTranslator from '../helpers/InitialValuesTranslator';

export default (
  {
    keep = [],
    unwind = [],
    marshal = {},
    modify = {},
    translate = {},
    marshalSelectively,
    onSubmit,
  },
  data,
) => {
  const runMarshalOptions = (callback) => (values) => {
    const expanded = flat(values);
    const newValues = dot.translateAndModify(
      expanded,
      marshal,
    );

    const output = flat.unflatten(
      marshalSelectively
        ? merge({}, expanded, newValues)
        : newValues,
    );

    return callback ? callback(output) : output;
  };

  return {
    executeMarshal: runMarshalOptions,
    onSubmit: runMarshalOptions(onSubmit),

    initialValues: new InitialValuesTranslator(data)
      .translate(translate)
      .prune(keep)
      .modify(modify)
      .toString(unwind),
  };
};

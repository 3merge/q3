export const handleSubmit = (onSubmit, onSuccess) => () =>
  onSubmit()
    .then(onSuccess)
    .catch(() => {
      // noop
    });

export const matchAgainstUppercase = (a) => (b) =>
  String(a).toUpperCase() === b;

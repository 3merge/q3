import React from 'react';
import { i18n } from 'q3-ui-locale';
import { AuthContext } from 'q3-ui-permissions';
import { useTimezoneInterceptor } from 'q3-ui-rest';

const useLocale = () => {
  const profile =
    React.useContext(AuthContext)?.state?.profile;

  const lng = profile?.lang;

  useTimezoneInterceptor(profile?.timezone);

  React.useEffect(() => {
    if (lng && i18n.resolvedLanguage)
      i18n.changeLanguage(lng);
  }, [lng]);
};

export default useLocale;

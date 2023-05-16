import React from 'react';

export const useBeforeUnload = (when: boolean, message?: string | null) => {
  React.useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = message;
      return message;
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [when, message]);
};

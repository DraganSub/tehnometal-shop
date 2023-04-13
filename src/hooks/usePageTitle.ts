import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = (title: string): void => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | Tehnometal Shop`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location, title]);
};

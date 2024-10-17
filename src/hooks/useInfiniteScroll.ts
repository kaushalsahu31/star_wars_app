import { useEffect, useState } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setIsFetching(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [isFetching, setIsFetching] as const;
};

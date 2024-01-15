import { useEffect, useRef } from 'react';

const useMutationObserver = (targetRef, callback, options) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      const observer = new MutationObserver(callback);

      observer.observe(target, options);

      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef, callback, options]);

  return observerRef.current;
};

export default useMutationObserver;
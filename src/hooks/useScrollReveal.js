import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — returns a ref + isVisible flag.
 * The element starts transparent/offset and becomes visible
 * when it scrolls into the viewport via IntersectionObserver.
 *
 * @param {Object}  options
 * @param {string}  options.threshold  — observer threshold (default '0.1')
 * @param {string}  options.rootMargin — observer rootMargin (default '0px 0px -40px 0px')
 */
export const useScrollReveal = ({ threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already in the viewport on mount, show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Only animate once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

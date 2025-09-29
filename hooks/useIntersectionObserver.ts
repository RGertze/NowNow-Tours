import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters/exits the viewport
 * Useful for scroll-triggered animations and lazy loading
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}): [RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

/**
 * Hook for multiple elements intersection observation
 * Returns a Map of element IDs to their visibility state
 */
export function useMultipleIntersectionObserver<T extends Element = HTMLDivElement>(
  elements: Array<{ id: string; ref: RefObject<T> }>,
  options: UseIntersectionObserverProps = {}
): Map<string, boolean> {
  const [visibilityMap, setVisibilityMap] = useState<Map<string, boolean>>(
    new Map()
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elements.forEach(({ id, ref }) => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibilityMap((prev) => {
            const newMap = new Map(prev);
            newMap.set(id, entry.isIntersecting);
            return newMap;
          });

          if (options.triggerOnce && entry.isIntersecting) {
            observer.unobserve(element);
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [elements, options]);

  return visibilityMap;
}
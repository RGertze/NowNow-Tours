import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * Checks both system preference and in-app toggle
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check in-app data attribute
    const checkReducedMotion = () => {
      const systemPrefersReduced = mediaQuery.matches;
      const appPrefersReduced = document.documentElement.getAttribute('data-reduce-motion') === 'true';
      setPrefersReducedMotion(systemPrefersReduced || appPrefersReduced);
    };

    // Initial check
    checkReducedMotion();

    // Listen for system preference changes
    const handleChange = () => checkReducedMotion();
    mediaQuery.addEventListener('change', handleChange);

    // Listen for app-level changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'data-reduce-motion'
        ) {
          checkReducedMotion();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduce-motion'],
    });

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to get safe animation duration based on reduced motion preference
 */
export function useAnimationDuration(normalDuration: number = 300): number {
  const prefersReducedMotion = usePrefersReducedMotion();
  return prefersReducedMotion ? 0 : normalDuration;
}

/**
 * Hook to conditionally apply animations
 */
export function useConditionalAnimation<T>(
  animationProps: T,
  fallbackProps: T
): T {
  const prefersReducedMotion = usePrefersReducedMotion();
  return prefersReducedMotion ? fallbackProps : animationProps;
}
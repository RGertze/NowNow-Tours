import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { createReducedMotionVariant } from './motionVariants';

interface MotionWrapperProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  variants: Variants;
  className?: string;
  as?: keyof typeof motion;
  fallbackClassName?: string;
}

/**
 * Wrapper component that automatically handles reduced motion preferences
 * Switches between full animation and reduced motion variants
 */
export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants,
  className = '',
  as = 'div',
  fallbackClassName = '',
  ...motionProps
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionComponent = motion[as];
  
  // Use reduced motion variants if user prefers reduced motion
  const activeVariants = prefersReducedMotion 
    ? createReducedMotionVariant(variants) 
    : variants;
  
  // Apply fallback className if reduced motion is preferred
  const activeClassName = prefersReducedMotion && fallbackClassName
    ? `${className} ${fallbackClassName}`
    : className;

  return (
    <MotionComponent
      variants={activeVariants}
      className={activeClassName}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Simplified motion wrapper for common use cases
 */
interface SimpleMotionProps {
  children: ReactNode;
  className?: string;
  type?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
  as?: keyof typeof motion;
}

export const SimpleMotion: React.FC<SimpleMotionProps> = ({
  children,
  className = '',
  type = 'fadeUp',
  delay = 0,
  duration = 0.6,
  as = 'div',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionComponent = motion[as];
  
  // Create simple variants based on type
  const getVariants = (): Variants => {
    const baseTransition = {
      duration: prefersReducedMotion ? 0.01 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    };
    
    switch (type) {
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: baseTransition },
          exit: { opacity: 0, transition: { ...baseTransition, duration: baseTransition.duration / 2 } }
        };
      case 'scaleIn':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1, transition: baseTransition },
          exit: { opacity: 0, scale: 0.95, transition: { ...baseTransition, duration: baseTransition.duration / 2 } }
        };
      case 'slideInLeft':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0, transition: baseTransition },
          exit: { opacity: 0, x: -20, transition: { ...baseTransition, duration: baseTransition.duration / 2 } }
        };
      case 'slideInRight':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0, transition: baseTransition },
          exit: { opacity: 0, x: 20, transition: { ...baseTransition, duration: baseTransition.duration / 2 } }
        };
      case 'fadeUp':
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: baseTransition },
          exit: { opacity: 0, y: 20, transition: { ...baseTransition, duration: baseTransition.duration / 2 } }
        };
    }
  };

  return (
    <MotionComponent
      variants={getVariants()}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Wrapper for scroll-triggered animations
 */
interface ScrollMotionProps {
  children: ReactNode;
  className?: string;
  type?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const ScrollMotion: React.FC<ScrollMotionProps> = ({
  children,
  className = '',
  type = 'fadeUp',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ 
        threshold,
        rootMargin,
        once: triggerOnce 
      }}
      className={className}
    >
      <SimpleMotion type={type}>
        {children}
      </SimpleMotion>
    </motion.div>
  );
};
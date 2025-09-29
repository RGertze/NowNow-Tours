import { Variants } from 'framer-motion';

/**
 * Collection of reusable Framer Motion variants
 * Each variant includes both normal and reduced-motion versions
 */

// Fade animations
export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeDown: Variants = {
  initial: { 
    opacity: 0, 
    y: -20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// Scale animations
export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.95 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const scaleUp: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.25, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// Slide animations
export const slideInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { 
      duration: 0.35, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const slideInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { 
      duration: 0.35, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// Container animations for staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

// Special effect animations
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const shake: Variants = {
  initial: { x: 0 },
  animate: {
    x: [-2, 2, -2, 2, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Page transition animations
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// Modal/overlay animations
export const modalOverlay: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.3 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2 
    }
  }
};

export const modalContent: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// Hover animations
export const hoverScale: Variants = {
  initial: { scale: 1 },
  whileHover: { 
    scale: 1.03,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  whileTap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1 
    }
  }
};

export const hoverLift: Variants = {
  initial: { y: 0, boxShadow: "0 4px 25px -5px rgba(0, 0, 0, 0.1)" },
  whileHover: { 
    y: -4,
    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  }
};

// Utility function to create reduced motion variants
export const createReducedMotionVariant = (variant: Variants): Variants => {
  const reducedVariant: Variants = {};
  
  Object.keys(variant).forEach((key) => {
    const state = variant[key];
    if (typeof state === 'object' && state !== null) {
      reducedVariant[key] = {
        ...state,
        transition: {
          duration: 0.01,
          ease: 'linear'
        }
      };
    } else {
      reducedVariant[key] = state;
    }
  });
  
  return reducedVariant;
};
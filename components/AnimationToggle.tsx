import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface AnimationToggleProps {
  className?: string;
  showLabel?: boolean;
  position?: 'fixed' | 'static';
}

/**
 * Animation Toggle Component
 * Provides a user-accessible control to enable/disable animations
 * Respects system preferences and maintains user choice in localStorage
 */
export const AnimationToggle: React.FC<AnimationToggleProps> = ({
  className = '',
  showLabel = true,
  position = 'fixed',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [appReduceMotion, setAppReduceMotion] = useState(false);
  const systemPrefersReducedMotion = usePrefersReducedMotion();

  // Load user preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('prefer-reduced-motion');
    if (savedPreference) {
      const shouldReduce = savedPreference === 'true';
      setAppReduceMotion(shouldReduce);
      document.documentElement.setAttribute('data-reduce-motion', shouldReduce.toString());
    }
  }, []);

  const toggleAnimations = () => {
    const newValue = !appReduceMotion;
    setAppReduceMotion(newValue);
    
    // Save to localStorage
    localStorage.setItem('prefer-reduced-motion', newValue.toString());
    
    // Update document attribute
    document.documentElement.setAttribute('data-reduce-motion', newValue.toString());
    
    // Collapse after toggle
    setTimeout(() => setIsExpanded(false), 500);
  };

  // Determine if animations are currently disabled
  const animationsDisabled = systemPrefersReducedMotion || appReduceMotion;

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: animationsDisabled ? 1 : 1.05,
      rotate: animationsDisabled ? 0 : 5,
      transition: { 
        duration: animationsDisabled ? 0.01 : 0.2,
        ease: 'easeOut' 
      }
    },
    tap: { 
      scale: animationsDisabled ? 1 : 0.95,
      transition: { duration: animationsDisabled ? 0.01 : 0.1 }
    },
  };

  const expandedContentVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: animationsDisabled ? 0.01 : 0.2,
        ease: 'easeInOut',
      },
    },
    expanded: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: animationsDisabled ? 0.01 : 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: animationsDisabled ? 0 : [0, 10, -10, 0],
      scale: animationsDisabled ? 1 : [1, 1.1, 1],
      transition: {
        duration: animationsDisabled ? 0.01 : 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const positionClasses = position === 'fixed' 
    ? 'fixed bottom-6 right-6 z-40' 
    : '';

  return (
    <motion.div
      className={`${positionClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: animationsDisabled ? 0.01 : 0.5,
          delay: animationsDisabled ? 0 : 1,
        }
      }}
    >
      {/* Main Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          bg-white/90 backdrop-blur-md shadow-strong border border-stone-200 
          rounded-full p-4 hover:bg-white hover:shadow-medium 
          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
          transition-all duration-200 group
          ${isExpanded ? 'rounded-b-none' : ''}
        `}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        aria-label={`Animation preferences. Currently: ${animationsDisabled ? 'disabled' : 'enabled'}`}
        aria-expanded={isExpanded}
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          {animationsDisabled ? (
            <EyeSlashIcon className="w-6 h-6 text-stone-600 group-hover:text-sky-600" />
          ) : (
            <SparklesIcon className="w-6 h-6 text-sky-600 group-hover:text-orange-500" />
          )}
        </motion.div>
      </motion.button>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-md shadow-strong border border-stone-200 rounded-2xl overflow-hidden min-w-80"
            variants={expandedContentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <CogIcon className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-sky-800">Animation Preferences</h3>
              </div>

              {/* System Preference Info */}
              {systemPrefersReducedMotion && (
                <motion.div
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: animationsDisabled ? 0.01 : 0.3,
                      delay: animationsDisabled ? 0 : 0.1,
                    }
                  }}
                >
                  <p className="text-blue-800 text-sm font-medium mb-1">
                    System Preference Detected
                  </p>
                  <p className="text-blue-700 text-xs">
                    Your system is set to prefer reduced motion. This setting respects that preference.
                  </p>
                </motion.div>
              )}

              {/* Toggle Control */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <label 
                    htmlFor="animation-toggle" 
                    className="block font-medium text-stone-700 mb-1"
                  >
                    Enable Animations
                  </label>
                  <p className="text-sm text-stone-500">
                    {animationsDisabled 
                      ? 'Animations are currently disabled' 
                      : 'Animations enhance the visual experience'
                    }
                  </p>
                </div>
                
                <motion.button
                  id="animation-toggle"
                  onClick={toggleAnimations}
                  disabled={systemPrefersReducedMotion}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 focus:outline-none focus:ring-2
                    focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50
                    disabled:cursor-not-allowed
                    ${!appReduceMotion && !systemPrefersReducedMotion
                      ? 'bg-sky-600' 
                      : 'bg-stone-300'
                    }
                  `}
                  whileHover={!systemPrefersReducedMotion ? { scale: animationsDisabled ? 1 : 1.05 } : {}}
                  whileTap={!systemPrefersReducedMotion ? { scale: animationsDisabled ? 1 : 0.95 } : {}}
                >
                  <motion.span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
                      transition-transform duration-200
                      ${!appReduceMotion && !systemPrefersReducedMotion
                        ? 'translate-x-6' 
                        : 'translate-x-1'
                      }
                    `}
                    layout={!animationsDisabled}
                    transition={animationsDisabled ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </motion.button>
              </div>

              {/* Status Indicator */}
              <motion.div
                className={`
                  flex items-center gap-2 p-3 rounded-lg text-sm
                  ${animationsDisabled
                    ? 'bg-orange-50 text-orange-800 border border-orange-200'
                    : 'bg-green-50 text-green-800 border border-green-200'
                  }
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: animationsDisabled ? 0.01 : 0.3,
                    delay: animationsDisabled ? 0 : 0.2,
                  }
                }}
              >
                <div className={`
                  w-2 h-2 rounded-full
                  ${animationsDisabled ? 'bg-orange-400' : 'bg-green-400'}
                `} />
                <span className="font-medium">
                  {animationsDisabled 
                    ? 'Reduced motion enabled' 
                    : 'Full animations enabled'
                  }
                </span>
              </motion.div>

              {/* Info Text */}
              <motion.p
                className="text-xs text-stone-500 mt-3 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: {
                    duration: animationsDisabled ? 0.01 : 0.4,
                    delay: animationsDisabled ? 0 : 0.3,
                  }
                }}
              >
                This setting controls page animations and transitions. 
                Your preference is saved automatically.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Label (when collapsed) */}
      <AnimatePresence>
        {!isExpanded && showLabel && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: animationsDisabled ? 0.01 : 0.2,
                delay: animationsDisabled ? 0 : 2,
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 10, 
              scale: 0.9,
              transition: {
                duration: animationsDisabled ? 0.01 : 0.15,
              }
            }}
          >
            Animation settings
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimationToggle;
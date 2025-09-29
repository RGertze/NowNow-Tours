import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer, shake } from '../motion/motionVariants';

// Icons
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

// Form validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phone: z.string()
    .optional()
    .refine((phone) => !phone || /^[\+]?[1-9][\d]{0,15}$/.test(phone), {
      message: 'Please enter a valid phone number',
    }),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp'], {
    required_error: 'Please select a preferred contact method',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  index: number;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, title, content, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-stone-100"
      variants={cardVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover={{
        y: prefersReducedMotion ? 0 : -2,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <div className="text-sky-600">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sky-800 mb-2">{title}</h3>
          <div className="text-stone-600">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const confettiSourceRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const fireConfetti = () => {
    if (prefersReducedMotion || !confettiSourceRef.current) return;

    const rect = confettiSourceRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#0369a1', '#f97316', '#06b6d4', '#f59e0b'],
      ticks: 200,
    });

    // Second burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: x - 0.1, y },
        colors: ['#0369a1', '#f97316'],
      });
      
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: x + 0.1, y },
        colors: ['#0369a1', '#f97316'],
      });
    }, 250);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      setIsSubmitted(true);
      fireConfetti();
      
      // Reset form after success
      setTimeout(() => {
        reset();
      }, 100);
      
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputBlur = (fieldName: keyof ContactFormData) => {
    trigger(fieldName);
  };

  const inputVariants = {
    invalid: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.4,
      },
    },
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: 'Phone',
      content: (
        <div>
          <p className="font-medium">+1 (234) 567-890</p>
          <p className="text-sm text-stone-500">Mon-Fri, 9AM-6PM EST</p>
        </div>
      ),
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: 'Email',
      content: (
        <div>
          <a href="mailto:contact@nownowtours.com" className="font-medium text-sky-600 hover:text-sky-700">
            contact@nownowtours.com
          </a>
          <p className="text-sm text-stone-500">We respond within 24 hours</p>
        </div>
      ),
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: 'WhatsApp',
      content: (
        <div>
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium text-green-600 hover:text-green-700 inline-flex items-center gap-2"
          >
            <i className="fab fa-whatsapp" />
            Chat with us instantly
          </a>
          <p className="text-sm text-stone-500">Available 24/7</p>
        </div>
      ),
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: 'Business Hours',
      content: (
        <div>
          <p className="font-medium">Mon-Fri: 9AM-6PM EST</p>
          <p className="font-medium">Sat-Sun: 10AM-4PM EST</p>
          <p className="text-sm text-stone-500">Emergency support available</p>
        </div>
      ),
    },
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-stone-50 via-white to-sky-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-gradient-to-tl from-orange-50/30 to-transparent pointer-events-none" />
      
      <div className="max-width-container container-padding relative z-10">
        {/* Section Header */}
        <ScrollMotion
          ref={headerRef}
          className="text-center mb-16"
          type="fadeUp"
          threshold={0.3}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-sky-800 mb-6"
            variants={fadeUp}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={fadeUp}
          >
            Have questions or ready to book your next adventure? 
            We'd love to hear from you and help plan your perfect African journey.
          </motion.p>
          
          {/* Decorative Element */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto rounded-full"
            variants={fadeUp}
          />
        </ScrollMotion>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-12 shadow-strong border border-stone-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }
              }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: prefersReducedMotion ? 0.01 : 0.5,
                      }
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <motion.div
                      ref={confettiSourceRef}
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                        }
                      }}
                    >
                      <CheckCircleIcon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold font-display text-sky-800 mb-4">
                      Thank You!
                    </h3>
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">
                      Your message has been sent successfully. We'll get back to you within 24 hours 
                      with all the details for your African adventure.
                    </p>
                    
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    variants={staggerContainer}
                  >
                    <motion.div variants={fadeUp}>
                      <h3 className="text-2xl lg:text-3xl font-bold font-display text-sky-800 mb-8">
                        Send us a Message
                      </h3>
                    </motion.div>

                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={fadeUp}>
                        <label htmlFor="name" className="block text-stone-700 font-medium mb-2">
                          Full Name *
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          {...register('name')}
                          onBlur={() => handleInputBlur('name')}
                          className={`form-input ${errors.name ? 'border-red-300' : ''}`}
                          placeholder="John Doe"
                          variants={errors.name ? inputVariants : {}}
                          animate={errors.name ? 'invalid' : ''}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              className="text-red-600 text-sm mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label htmlFor="email" className="block text-stone-700 font-medium mb-2">
                          Email Address *
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          {...register('email')}
                          onBlur={() => handleInputBlur('email')}
                          className={`form-input ${errors.email ? 'border-red-300' : ''}`}
                          placeholder="john@example.com"
                          variants={errors.email ? inputVariants : {}}
                          animate={errors.email ? 'invalid' : ''}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              className="text-red-600 text-sm mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Phone and Preferred Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={fadeUp}>
                        <label htmlFor="phone" className="block text-stone-700 font-medium mb-2">
                          Phone Number
                        </label>
                        <motion.input
                          type="tel"
                          id="phone"
                          {...register('phone')}
                          onBlur={() => handleInputBlur('phone')}
                          className={`form-input ${errors.phone ? 'border-red-300' : ''}`}
                          placeholder="+1 (234) 567-8900"
                          variants={errors.phone ? inputVariants : {}}
                          animate={errors.phone ? 'invalid' : ''}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              className="text-red-600 text-sm mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.phone.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label htmlFor="preferredContact" className="block text-stone-700 font-medium mb-2">
                          Preferred Contact Method *
                        </label>
                        <motion.select
                          id="preferredContact"
                          {...register('preferredContact')}
                          onBlur={() => handleInputBlur('preferredContact')}
                          className={`form-input ${errors.preferredContact ? 'border-red-300' : ''}`}
                          variants={errors.preferredContact ? inputVariants : {}}
                          animate={errors.preferredContact ? 'invalid' : ''}
                        >
                          <option value="">Select method...</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="whatsapp">WhatsApp</option>
                        </motion.select>
                        <AnimatePresence>
                          {errors.preferredContact && (
                            <motion.p
                              className="text-red-600 text-sm mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.preferredContact.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Subject */}
                    <motion.div variants={fadeUp}>
                      <label htmlFor="subject" className="block text-stone-700 font-medium mb-2">
                        Subject *
                      </label>
                      <motion.input
                        type="text"
                        id="subject"
                        {...register('subject')}
                        onBlur={() => handleInputBlur('subject')}
                        className={`form-input ${errors.subject ? 'border-red-300' : ''}`}
                        placeholder="Inquiry about Zanzibar tour..."
                        variants={errors.subject ? inputVariants : {}}
                        animate={errors.subject ? 'invalid' : ''}
                      />
                      <AnimatePresence>
                        {errors.subject && (
                          <motion.p
                            className="text-red-600 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.subject.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp}>
                      <label htmlFor="message" className="block text-stone-700 font-medium mb-2">
                        Message *
                      </label>
                      <motion.textarea
                        id="message"
                        {...register('message')}
                        onBlur={() => handleInputBlur('message')}
                        rows={6}
                        className={`form-input resize-none ${errors.message ? 'border-red-300' : ''}`}
                        placeholder="Tell us about your dream African adventure..."
                        variants={errors.message ? inputVariants : {}}
                        animate={errors.message ? 'invalid' : ''}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            className="text-red-600 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={fadeUp}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-stone-400 disabled:to-stone-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-3"
                        whileHover={!isSubmitting ? { 
                          scale: prefersReducedMotion ? 1 : 1.02,
                          y: prefersReducedMotion ? 0 : -2 
                        } : {}}
                        whileTap={!isSubmitting ? { scale: prefersReducedMotion ? 1 : 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard
                key={info.title}
                icon={info.icon}
                title={info.title}
                content={info.content}
                index={index}
              />
            ))}

            {/* Map Placeholder */}
            <motion.div
              className="bg-gradient-to-br from-stone-200 to-stone-300 h-64 rounded-2xl shadow-soft flex items-center justify-center text-stone-500 border border-stone-200 overflow-hidden relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.4,
                }
              }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <MapPinIcon className="w-12 h-12 mx-auto mb-2 text-stone-400" />
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm">Coming Soon</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-sky-300 to-sky-400 rounded-full opacity-30" />
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-40" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
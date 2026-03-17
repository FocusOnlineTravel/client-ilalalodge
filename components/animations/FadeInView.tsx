'use client';

import { useEffect, useRef, ReactNode } from 'react';

type AnimationDirection = 'up' | 'left' | 'right' | 'fade';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: AnimationDirection;
}

const animationClasses: Record<AnimationDirection, string> = {
  up: 'animate-fade-in-up',
  left: 'animate-fade-in-left',
  right: 'animate-fade-in-right',
  fade: 'animate-fade-in',
};

export default function FadeInView({ children, delay = 0, className = '', direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animationClasses[direction]);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}

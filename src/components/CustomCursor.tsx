import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position of mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring tracking for outer ring
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.6 });

  // Faster spring tracking for inner dot to keep it crisp and responsive
  const dotX = useSpring(mouseX, { damping: 18, stiffness: 450, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 18, stiffness: 450, mass: 0.1 });

  useEffect(() => {
    // Hide native cursor only on systems with pointer mechanics (desktop)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) {
      document.body.classList.add('cursor-none-desktop');
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Event delegation to check hover over interactive UI elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.clickable') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[data-cursor-hover]');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      document.body.classList.remove('cursor-none-desktop');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [visible, mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Styles to inject to hide native cursor on desktop */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (hover: hover) and (pointer: fine) {
          .cursor-none-desktop,
          .cursor-none-desktop * {
            cursor: none !important;
          }
        }
      `}} />

      {/* 1. Luxurious Ambient Glow Backdrop (Slight Lag behind the ring) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.8 : isClicked ? 0.9 : 1.3,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", damping: 25, stiffness: 180 }
        }}
        className="fixed top-0 left-0 w-[55px] h-[55px] pointer-events-none z-[9999] rounded-full blur-[10px] bg-gradient-to-r from-violet/25 via-pink/20 to-cyan/25 mix-blend-screen transition-opacity duration-300 max-md:hidden"
      />

      {/* 2. Sleek Outer Minimalist Ring (28px) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : isClicked ? 0.75 : 1,
          width: 28,
          height: 28,
          // Premium subtle morphing shape when hovered over interactive components
          borderRadius: isHovering 
            ? ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"] 
            : "50%",
        }}
        transition={isHovering ? {
          borderRadius: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          },
          scale: { type: "spring", damping: 15, stiffness: 200 }
        } : {
          scale: { type: "spring", damping: 25, stiffness: 220 }
        }}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-violet-light/50 shadow-[0_0_10px_rgba(155,93,229,0.3)] max-md:hidden bg-violet/5"
      >
        {/* Ambient subtle outline pulsing glow */}
        {isHovering && (
          <div className="absolute inset-0 rounded-full border border-cyan/60 blur-[1px] opacity-70 animate-pulse" />
        )}
      </motion.div>

      {/* 3. Small core point with glowing neon intensity */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.6 : isClicked ? 0.5 : 1,
          backgroundColor: isHovering ? "#00f5d4" : "#f0eeff",
          boxShadow: isHovering 
            ? "0 0 12px rgba(0, 245, 212, 0.95), 0 0 25px rgba(155, 93, 229, 0.7)" 
            : "0 0 4px rgba(255, 255, 255, 0.6)"
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10001] max-md:hidden"
      />
    </>
  );
}

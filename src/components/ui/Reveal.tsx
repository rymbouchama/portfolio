"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Light entrance: fade + 16px rise, once, when the element enters the viewport.
 * Under prefers-reduced-motion, MotionConfig (reducedMotion="user") drops the movement and keeps only the fade.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

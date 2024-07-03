"use client";

import FrozenRoute from "@/app/components/framer/leave/frozen-route";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const AnimateLeave = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
}
export default AnimateLeave;

export function AnimateLeaveItem({ children, className, fadeOnly }: { children: React.ReactNode; className: string; fadeOnly?: boolean }) {
  const variants = { 
    exit: { opacity: 0, translateY: fadeOnly ? 0 : -10, transition: { duration: 0.5 } },
    enter: { opacity: 1, translateY: 0, transition: { duration: 0.5 } },
    initial: { opacity: 0 }
  }
  return (
    <motion.div variants={variants} initial="initial" animate="enter" exit="exit" className={className}>
      {children}
    </motion.div>
  );
}
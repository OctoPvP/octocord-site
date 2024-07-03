"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DelayContext } from "@/app/components/framer/animation-context";

type PopInProps = {
  duration: number;
  once?: boolean;
  children: React.ReactNode;
  delay?: number; // TODO: stagger children
  className?: string;
};
const PopIn = ({ once = true, ...props }: PopInProps) => {
  const contextDelay = useContext(DelayContext);
  const delay = props.delay ?? contextDelay.delay;
  return (
    <motion.div
      className={props.className}
      initial={"hidden"}
      whileInView={"visible"}
      viewport={{ once }}
      transition={{ duration: props.duration, delay }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default PopIn;

import React from "react";
import { LuLoader2 } from "react-icons/lu";

const Spinner = ({ className }: { className?: string }) => {
  return <LuLoader2 className={`mr-1 animate-spin ${className}`} />;
};

export default Spinner;
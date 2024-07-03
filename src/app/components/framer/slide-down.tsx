"use client";

import Slide, { type SlideProps } from "@/app/components/framer/slide";
import React from "react";

const SlideUp = (props: SlideProps & Omit<SlideProps, "translateY">) => {
  return <Slide {...props} translateY={-10} />;
};

export default SlideUp;

import BestOffer from "./blocks/BestOffer";
import WhyUs from "./blocks/WhyUs";
import Testimonials from "./blocks/Testimonials";
import Faq from "./blocks/Faq";

export type BlockType = "BestOffer" | "WhyUs" | "Testimonials" | "Faq";

import type { ComponentType } from "react";

export const BlockRegistry: Record<BlockType, ComponentType<any>> = {
  BestOffer,
  WhyUs,
  Testimonials,
  Faq,
};

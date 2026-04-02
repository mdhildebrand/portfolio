'use client';

import Planet1 from "@/assets/planet1.svg";
import Planet2 from "@/assets/planet2.svg";
import Planet3 from "@/assets/planet3.svg";

console.log('Planet1 type:', typeof Planet1);
console.log('Planet1 value:', Planet1);

export const SvgPlanet1 = () => {
  console.log('rendering Planet1:', typeof Planet1);
  return <Planet1 />;
};
export const SvgPlanet2 = () => <Planet2 />;
export const SvgPlanet3 = () => <Planet3 />;
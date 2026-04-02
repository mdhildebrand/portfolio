'use client'

import { useId, useState } from "react";
import styled from "styled-components"

interface RingWrapperProps {
  width: number
  height: number
  $duration: number
  $startAngle: number
  $id: string
}

const RingWrapper = styled.div<RingWrapperProps>`
  width: ${(props) => props.width ? props.width : '500'}px;
  height: ${(props) => props.height ? props.height : '500'}px;
  position: absolute;
  top: 50%;
  left: 50%;

  @keyframes ring-spin-${(props) => props.$id} {
    from  { 
      transform: translate(-50%, -50%) rotate(${(props) => props.$startAngle}deg);
    }
    to    {
      transform: translate(-50%, -50%) rotate(${(props) => props.$startAngle + 360}deg);
    }
  }

  animation: ring-spin-${(props) => props.$id} ${(props) => props.$duration}s linear infinite;

`;

interface RingProps {
  size: number
  duration: number
  startAngle: number
  id: string
  children: React.ReactNode
}

const Ring = ({ size, duration, startAngle, id, children }: RingProps) => {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const strokeWidth = 2;
  const holeRadius = 50;
  const clipHoleRadius = holeRadius + strokeWidth;
  const holeBottom = cy + r;
  const holeTop = cy - r;

  const clipPath = [
    `M 0 0 H ${size} V ${size} H 0 Z`,

    // bottom hole
    `M ${cx} ${holeBottom}`,
    `m ${-clipHoleRadius} 0`,
    `a ${clipHoleRadius} ${clipHoleRadius} 0 1 0 ${clipHoleRadius * 2} 0`,
    `a ${clipHoleRadius} ${clipHoleRadius} 0 1 0 ${-clipHoleRadius * 2} 0`,

    // top hole
    `M ${cx} ${holeTop}`,
    `m ${-clipHoleRadius} 0`,
    `a ${clipHoleRadius} ${clipHoleRadius} 0 1 0 ${clipHoleRadius * 2} 0`,
    `a ${clipHoleRadius} ${clipHoleRadius} 0 1 0 ${-clipHoleRadius * 2} 0`,
  ].join(' ');

  const safeId = id.replace(/:/g, '');

  return (
    <RingWrapper width={size} height={size} $duration={duration} $startAngle={startAngle} $id={safeId}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {children ? (
          <defs>
            <clipPath id={`ring-clip-${id}`}>
              <path d={clipPath} />
            </clipPath>
          </defs>
        ) : ''}
        <circle
          cx={cx}
          cy={cy}
          r={r - strokeWidth / 2}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          clipPath={`url(#ring-clip-${id})`}
        />
      </svg>
      {children}
    </RingWrapper>
  );
};

interface PlanetProps {
  $duration: number
  $startAngle: number
  $id: string
}

const PlanetWrapper = styled.div<PlanetProps>`
  position: absolute;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  padding: 20px;

  &:first-child {
    bottom: 0;

    @keyframes first-counter-spin-${(props) => props.$id} {
      from  {transform: translate(-50%, 50%) rotate(-${(props) => props.$startAngle}deg);}
      to    {transform: translate(-50%, 50%) rotate(-${(props) => props.$startAngle + 360}deg);}
    } 

    animation: first-counter-spin-${(props) => props.$id} ${(props) => props.$duration}s linear infinite;
  }

  &:last-child {
    top: 0;

    @keyframes last-counter-spin-${(props) => props.$id} {
      from  {transform: translate(-50%, -50%) rotate(-${(props) => props.$startAngle}deg);}
      to    {transform: translate(-50%, -50%) rotate(-${(props) => props.$startAngle + 360}deg);}
    } 

    animation: last-counter-spin-${(props) => props.$id} ${(props) => props.$duration}s linear infinite;
  }

  >svg {
    max-height: 100%;
    max-width: 100%;
    fill: white;
    stroke: white;

    path, circle, rect {
      fill: white;
      stroke: white;
    }
  }

  animation: counter-spin ${(props) => props.$duration}s linear infinite;
`;

interface OrbitProps {
  size: number
  planet?: React.ElementType
}

export default function Orbit({ size, planet }: OrbitProps) {
  const [{ duration, startAngle }] = useState(() => ({
    duration: 8 + Math.random() * 8,                // 8-16s
    startAngle: Math.floor(Math.random() * 90),    // 0-359deg
  }));

  const id = useId();

  const safeId = id.replace(/:/g, '');

  const Planet = planet as React.ElementType;

  return (
    <Ring
      size={size}
      duration={duration}
      startAngle={startAngle}
      id={id}
    >
      {planet ? (
        <div>
          <PlanetWrapper $duration={duration} $startAngle={startAngle} $id={safeId}>
            <Planet />
          </PlanetWrapper>
          <PlanetWrapper $duration={duration} $startAngle={startAngle} $id={safeId}>
            <Planet />
          </PlanetWrapper>
        </div>
      ) : ''}
    </Ring>
  )
}
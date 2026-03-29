import Image from "next/image";
import { useId } from "react";
import styled from "styled-components"

const SPIN_ROTATION = '10s';

interface Props {
  $bottom: boolean
  $left: boolean
  width: number
  height: number
}

const RingWrapper = styled.div<Props>`
  width: ${(props) => props.width ? props.width : '500'}px;
  height: ${(props) => props.height ? props.height : '500'}px;
  position: absolute;
  ${(props) => props.$bottom ? 'bottom: 0' : 'top: 0'};
  ${(props) => props.$left ? 'left: 0' : 'right: 0'};

  @keyframes spin {
    from  { 
      transform:
        translate(
          ${(props) => props.$left ? '-50%' : '50%'}, 
          ${(props) => props.$bottom ? '50%' : '-50%'}
        )
        rotate(0deg);
    }
    to    {
      transform:
        translate(
          ${(props) => props.$left ? '-50%' : '50%'}, 
          ${(props) => props.$bottom ? '50%' : '-50%'}
        )
        rotate(360deg);
    }
  }

  animation: spin ${SPIN_ROTATION} linear infinite;
`;

interface RingProps {
  size: number
  bottom: boolean
  left: boolean
  children: React.ReactNode
}

const Ring = ({ size, bottom, left, children }: RingProps) => {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const strokeWidth = 2;
  const holeRadius = 50;
  const clipHoleRadius = holeRadius + strokeWidth;
  const holeBottom = cy + r;
  const holeTop = cy - r;

  const id = useId();

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

  return (
    <RingWrapper width={size} height={size} $bottom={bottom} $left={left}>
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

const PlanetWrapper = styled.div`
  position: absolute;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  padding: 20px;

  &:first-child {
    bottom: 0;

    @keyframes first-counter-spin {
      from  {transform: translate(-50%, 50%) rotate(0deg);}
      to    {transform: translate(-50%, 50%) rotate(-360deg);}
    } 

    animation: first-counter-spin ${SPIN_ROTATION} linear infinite;
  }

  &:last-child {
    top: 0;

    @keyframes last-counter-spin {
      from  {transform: translate(-50%, -50%) rotate(0deg);}
      to    {transform: translate(-50%, -50%) rotate(-360deg);}
    } 

    animation: last-counter-spin ${SPIN_ROTATION} linear infinite;
  }

  >img {
    max-height: 100%;
    max-width: 100%;
  }

  animation: counter-spin ${SPIN_ROTATION} linear infinite;
`;

type LocationVariant = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface OrbitProps {
  size: number
  location?: LocationVariant
  planet?: string
}

export default function Orbit({ size, location, planet }: OrbitProps) {
  let atBottom = false;
  let atLeft = false;
  if (location === 'bottomRight' || location === 'bottomLeft') {
    atBottom = true;
  }
  if (location === 'topLeft' || location === 'bottomLeft') {
    atLeft = true;
  }

  return (
    <Ring
      size={size}
      bottom={atBottom}
      left={atLeft}
    >
      {planet ? (
        <div>
          <PlanetWrapper>
            <Image src={planet} alt="planet" width={60} height={60} />
          </PlanetWrapper>
          <PlanetWrapper>
            <Image src={planet} alt="planet" width={60} height={60} />
          </PlanetWrapper>
        </div>
      ) : ''}
    </Ring>
  )
}
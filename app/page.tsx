'use client'

import Image from "next/image";
import styled from "styled-components";
import Orbit from "./_components/Orbit/orbit";
// import HTML5 from "@/assets/html5.svg";
import Planet1 from "@/assets/planet1.svg";
import Planet2 from "@/assets/planet2.svg";
import Planet3 from "@/assets/planet3.svg";

const PageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  // background: linear-gradient(45deg, #4466ff, #ee88cc);
  background: linear-gradient(45deg, #000070, #00aacc, #000070, #00aacc, #000070);
  background-size: 200vw 200vw;
  animation: run 20s linear infinite;

  @keyframes run {
    0%{ background-position: 0% 0% }
    100%{ background-position: 0% 200vw }
    // 100%{ background-position: 0% 0% }
  }
`;

const H1 = styled.h1`
  margin: auto auto auto 0;
  font-size: clamp(24px, 15vw, 100px);
  z-index: 100;
  text-align: left;
`;

const ContentWrapper = styled.div`
  padding: clamp(1rem, calc(5vw - 6px), 2rem);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justifcation: flex-start;
`;

type LocationVariant = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface OrbitWrapperProps {
  $location: LocationVariant
}

const BASE_SIZE = 1000;

const OrbitWrapper = styled.div<OrbitWrapperProps>`
  --scale: clamp(0, calc(180vw / ${BASE_SIZE}px), 1);

  position: absolute;
  width: ${BASE_SIZE}px;
  height: ${BASE_SIZE}px;

  ${(props) => props.$location === 'topLeft' && `
    top: 0;
    left: 0;
    transform: translate(-50%, -50%) scale(var(--scale));
  `}
  ${(props) => props.$location === 'topRight' && `
    top: 0;
    right: 0;
    transform: translate(50%, -50%) scale(var(--scale));
  `}
  ${(props) => props.$location === 'bottomLeft' && `
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%) scale(var(--scale));
  `}
  ${(props) => props.$location === 'bottomRight' && `
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%) scale(var(--scale));
  `}
`;

console.log('Planet1 : ', Planet1);
console.log('Planet1:', typeof Planet1, Planet1);

export default function Home() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <H1>Matt<br/>Hildebrand</H1>
      </ContentWrapper>
      <OrbitWrapper $location="topRight">
        <Orbit
          size={300}
          planet={Planet3}
        />
        <Orbit
          size={500}
          planet={Planet2}
        />
        <Orbit
          size={650}
          planet={Planet1}
        />
      </OrbitWrapper>
    </PageWrapper>
  );
}

'use client'

import styled from "styled-components";
import Orbit from "./_components/orbit";
import { SvgPlanet1, SvgPlanet2, SvgPlanet3 } from "./_components/Planets";
import { useEffect, useRef } from "react";

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

  // background: linear-gradient(-20deg, rgba(0, 100, 90, 1), 15%, rgba(255, 0, 0, 0));
  // animation: throb 4s ease-in-out infinite;

  // @keyframes throb {
  //   0%{ opacity: 0.8 }
  //   50%{ opacity: 1 }
  //   100%{ opacity: 0.8 }
  // }
`;

const H1 = styled.h1`
  margin: auto auto auto 0;
  font-size: clamp(24px, 15vw, 100px);
  line-height: 1.15;
  z-index: 100;
  text-align: left;
`;

const PageScroller = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 10;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const ContentWrapper = styled.section`
  padding: clamp(1rem, calc(5vw - 6px), 2rem);
  width: 100%;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: 0.5s ease;
`;

type LocationVariant = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface OrbitWrapperProps {
  $location: LocationVariant
}

const BASE_SIZE = 1000;

const OrbitWrapper = styled.div<OrbitWrapperProps>`
  scale: clamp(0, calc(180vw / ${BASE_SIZE}px), 1);

  position: absolute;
  width: ${BASE_SIZE}px;
  height: ${BASE_SIZE}px;

  scale: var(--orbit-scale);

  ${(props) => props.$location === 'topLeft' && `
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  `}
  ${(props) => props.$location === 'topRight' && `
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  `}
  ${(props) => props.$location === 'bottomLeft' && `
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  `}
  ${(props) => props.$location === 'bottomRight' && `
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  `}
`;

export default function Home() {
  const sections = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const currentIndex = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(currentIndex.current + direction, 0),
        sections.current.length - 1
      );

      currentIndex.current = nextIndex;
      sections.current[nextIndex].scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    const handleTouch = (() => {
      let touchStartY = 0;

      return {
        start: (e: TouchEvent) => {
          touchStartY = e.touches[0].clientY;
        },
        end: (e: TouchEvent) => {
          if (isScrolling.current) return;

          const diff = touchStartY - e.changedTouches[0].clientY;
          if (Math.abs(diff) < 50) return;

          isScrolling.current = true;
          const direction = diff > 0 ? 1 : -1;
          const nextIndex = Math.min(
            Math.max(currentIndex.current + direction, 0),
            sections.current.length -1
          );

          currentIndex.current = nextIndex;
          sections.current[nextIndex].scrollIntoView({ behavior: 'smooth' });

          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      };
    })();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouch.start);
    window.addEventListener('touchend', handleTouch.end);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch.start);
      window.removeEventListener('touchend', handleTouch.end);
    };
  }, []);

  return (
    <PageWrapper>
      <PageScroller>
        <ContentWrapper
          key='home'
          ref={(el) => { if (el) sections.current[0] = el; }}
        >
          <H1>Matt<br/>Hildebrand</H1>
        </ContentWrapper>
        <ContentWrapper
          key='projects'
          ref={(el) => { if (el) sections.current[1] = el; }}
        >
          <H1>Projects</H1>
        </ContentWrapper>
        <ContentWrapper
          key='contact'
          ref={(el) => { if (el) sections.current[2] = el; }}
        >
          <H1>Contact</H1>
        </ContentWrapper>
      </PageScroller>
      <OrbitWrapper
        $location="topRight"
        style={{ '--orbit-scale': `clamp(0, calc(180vw / ${BASE_SIZE}px), 1)`} as React.CSSProperties}
      >
        <Orbit
          size={300}
          planet={SvgPlanet3}
        />
        <Orbit
          size={500}
          planet={SvgPlanet2}
        />
        <Orbit
          size={650}
          planet={SvgPlanet1}
        />
      </OrbitWrapper>
    </PageWrapper>
  );
}

'use client'

import styled from "styled-components";
import Orbit from "./_components/orbit";
import { SvgPlanet1, SvgPlanet2, SvgPlanet3 } from "./_components/Planets";
import { useEffect, useRef } from "react";
import Hero from "./_components/Hero";
import Projects from "./_components/Projects";
import Contact from "./_components/Contact";

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

const PageScroller = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 10;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const ScrollTracker = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 25px;
  height: clamp(200px, 50vh, 360px);

  > div {
    width: 20px;
    height: 20px;
    // margin: 25px 25px;
    border-radius: 100%;
    outline-offset: 10px;
    background: #fff;
    cursor: pointer;

    &.active {
      outline: 2px solid white;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: calc(100% - 60px);
    background: #fff;
  }
`;

const ContentWrapper = styled.section`
  padding: clamp(70px, calc(5vw - 6px), 2rem);
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
  const trackers = useRef<HTMLElement[]>([]);
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
      trackers.current.forEach((element => element.classList.remove('active')));
      trackers.current[nextIndex].classList.add('active');

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
          trackers.current.forEach((element => element.classList.remove('active')));
          trackers.current[nextIndex].classList.add('active');

          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      };
    })();

    trackers.current.forEach((element, i) => {
      element.addEventListener('click', () => {
        if( !element.classList.contains('active') ) {
          trackers.current.forEach((element) => element.classList.remove('active'));
          trackers.current[i].classList.add('active');
          sections.current[i].scrollIntoView({ behavior: 'smooth' });
          currentIndex.current = i;
        }
      })
    });

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
        <ScrollTracker>
          <div
            key='home'
            className="active"
            ref={(el) => { if (el) trackers.current[0] = el; }}
          ></div>
          <div
            key='projects'
            ref={(el) => { if (el) trackers.current[1] = el; }}
          ></div>
          <div
            key='contact'
            ref={(el) => { if (el) trackers.current[2] = el; }}
          ></div>
        </ScrollTracker>
        <ContentWrapper
          key='home'
          ref={(el) => { if (el) sections.current[0] = el; }}
        >
          <Hero />
        </ContentWrapper>
        <ContentWrapper
          key='projects'
          ref={(el) => { if (el) sections.current[1] = el; }}
        >
          <Projects />
        </ContentWrapper>
        <ContentWrapper
          key='contact'
          ref={(el) => { if (el) sections.current[2] = el; }}
        >
          <Contact />
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

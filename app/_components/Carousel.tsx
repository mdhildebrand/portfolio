import { useEffect, useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  height: 60vh;
  margin-top: 32px;
  width: 60vw;
  overflow: hidden;
`;

const CarouselInnerContainer = styled.div`
  display: flex;
  gap: 20px;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: fit-content;

  transition: left 1s ease-in-out;

  &.grabbed {
    transition: none;
  }
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: round(down, calc(60vw - 150px), 1px);
  border-radius: 24px;
  border: 2px solid white;
`;

const Project = () => {
  return (
    <ProjectWrapper></ProjectWrapper>
  )
}

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef<number>(0);

  let pressed = false;
  let startX: number;
  let x;

  useEffect(() => {
    const container = containerRef.current;
    const innerContainer = innerContainerRef.current;
    const slides: HTMLElement[] = [];

    let xGrab = 0;
    let xRelease = 0;
    let xMovement = 0;

    if (innerContainer && container) {
      Array.from(innerContainer.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          slides.push(child);
        }
      })
      console.log('slides : ', slides);

      let boundItems = () => {
        let outer = container?.getBoundingClientRect();
        let inner = innerContainer?.getBoundingClientRect();

        if (parseInt(innerContainer?.style.left) > 0) {
          innerContainer.style.left = "0px";
        }

        if (inner.right < outer.right) {
          innerContainer.style.left = `-${inner.width - outer.width}px`;
        }
      };

      let updateIndex = () => {
        let nextIndex = currentIndex.current;
        console.log('xRelease : ', xRelease);
        console.log('xGrab : ', xGrab);
        if (xRelease < xGrab && xMovement < 0) {
          if (nextIndex < slides.length - 1) {
            nextIndex++;
          } else {
            nextIndex = 0;
          }
        } else if (nextIndex > 0 && xMovement > 0) {
          nextIndex--;
        }
        console.log('nextIndex : ', nextIndex);
        currentIndex.current = nextIndex;
        const newLeft = (slides[currentIndex.current].offsetWidth + 20) * currentIndex.current;
        console.log('newLeft : ', newLeft);
        innerContainer.classList.remove('grabbed');
        innerContainer.style.left = `-${newLeft}px`;
      }

      container.addEventListener("mousedown", (e: MouseEvent) => {
        pressed = true;
        startX = e.offsetX - innerContainer.offsetLeft;
        xGrab = e.offsetX;
        container.style.cursor = "grabbing";
        innerContainer.classList.add('grabbed');
      });

      container.addEventListener("mouseenter", () => {
        container.style.cursor = "grab";
      });

      document.addEventListener("mouseup", () => {
        container.style.cursor = "grab";
        pressed = false;

        updateIndex();
      });

      container.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();
        // console.log('e : ', e);

        x = e.offsetX;
        innerContainer.style.left = `${x - startX}px`;
        xMovement = e.movementX;
        xRelease = x;
        boundItems();
      });
    }
  }, [])

  return (
    <CarouselContainer ref={containerRef}>
      <CarouselInnerContainer ref={innerContainerRef}>
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </CarouselInnerContainer>
    </CarouselContainer>
  )
}
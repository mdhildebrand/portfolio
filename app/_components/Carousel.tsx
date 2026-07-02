import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import projects from "../../public/projects/projects.json";

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
  height: 100%;
  gap: 2rem;
  width: round(down, calc(60vw - 150px), 1px);
  // border-radius: 24px;
  // border: 2px solid white;
  padding: 1rem;
`;

const ProjectImage = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProjectText = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.25rem;
  }
`;

interface ProjectData {
  slug: string;
  image: string;
  title: string;
  description: string;
}

interface ProjectProps {
  data: ProjectData;

}

const Project: React.FC<ProjectProps> = ({ data } : ProjectProps ) => {
  console.log('data : ', data);
  return (
    <ProjectWrapper>
      <ProjectImage>
        <Image
          src={`/projects/${data.image}`}
          alt={`Screenshot of project ${data.title}`}
          width={500}
          height={1000}
        />
      </ProjectImage>
      <ProjectText>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </ProjectText>
    </ProjectWrapper>
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
      // console.log('slides : ', slides);

      let boundItems = () => {
        let outer = container?.getBoundingClientRect();
        let inner = innerContainer?.getBoundingClientRect();

        if (parseInt(innerContainer?.style.left) > 100) {
          innerContainer.style.left = "100px";
        }

        if (inner.right + 300 < outer.right) {
          innerContainer.style.left = `-${inner.width - outer.width + 300}px`;
        }
      };

      let updateIndex = () => {
        let nextIndex = currentIndex.current;
        // console.log('xRelease : ', xRelease);
        // console.log('xGrab : ', xGrab);
        if (xRelease < xGrab && xMovement < 0) {
          if (nextIndex < slides.length - 1) {
            nextIndex++;
          } else {
            // nextIndex = 0;

          }
        } else if (nextIndex > 0 && xMovement > 0) {
          nextIndex--;
        }
        // console.log('nextIndex : ', nextIndex);
        currentIndex.current = nextIndex;
        const newLeft = (slides[currentIndex.current].offsetWidth + 20) * currentIndex.current;
        // console.log('newLeft : ', newLeft);
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
        {projects.projects instanceof Array && projects.projects.map((project, i) => (
          <Project
            key={i}
            // slug={project.slug}
            // image={project.image}
            // title={project.title}
            // description={project.description}
            data={project}
          />
        ))}
      </CarouselInnerContainer>
    </CarouselContainer>
  )
}
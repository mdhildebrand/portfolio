import { useEffect } from "react";
import styled from "styled-components";
import Carousel from "./Carousel";

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  max-width: calc(90vw - 100px);
  margin-right: auto;
  
  > .p {
    max-width: 75%;
    font-size: clamp(1rem, 5vw, 1.75rem);
    line-height: 1.2;
  }
`;

export default function Projects(){
  return (
    <ProjectsContainer>
      <h1>Projects</h1>
      <p>Take a look at some of the projects I've worked on!</p>
      <Carousel />
    </ProjectsContainer>
  )
}
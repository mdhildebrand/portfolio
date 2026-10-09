import styled from "styled-components";
import Riverflow from "./Riverflow";

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  
  > .p {
    max-width: 75%;
    font-size: clamp(1rem, 5vw, 1.75rem);
    line-height: 1.2;
  }
`;

export default function Projects(){
  return (
    <ProjectsContainer>
      <h2>Selected work</h2>
      <Riverflow />
    </ProjectsContainer>
  )
}
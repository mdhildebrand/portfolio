import styled from "styled-components";

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

const ProjectCarousel = styled.div`
  display: flex;
  height: 60vh;
  margin-top: 32px;
  width: 80%;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50vw;
  border-radius: 24px;
  border: 2px solid white;
`;

export default function Projects(){
  return (
    <ProjectsContainer>
      <h1>Projects</h1>
      <p>Take a look at some of the projects I've worked on!</p>
      <ProjectCarousel>
        <CarouselWrapper>
          <Project></Project>
          <Project></Project>
          <Project></Project>
          <Project></Project>
          <Project></Project>
        </CarouselWrapper>
      </ProjectCarousel>
    </ProjectsContainer>
  )
}
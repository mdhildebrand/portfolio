import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import projects from "../../public/projects/projects.json";

const RiverflowContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 5rem;
  gap: 4rem;
`;

const ProjectWrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 3rem;
  width: 100%;
  padding-bottom: 8%;

  @media (max-width: 963px) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 963px) {
    width: 100%;
  }
`;

const DesktopImage = styled.div`
  position: relative;
  width: 100%;
`;

const MobileImage = styled.div`
  position: absolute;
  width: 30%;
  top: 20%;
  right: 10%;
  filter: drop-shadow(-3px -3px 12px #000);
`;

const ProjectText = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  h3 {
    font-size: clamp(1.5rem, 5vw, 2rem);
    margin-bottom: 1.5rem;
  }

  p {
    font-size: clamp(1rem, 3vw, 1.25rem);
    line-height: 1.5;
  }

  button {
    font-size: clamp(1rem, 3vw, 1.25rem);
    line-height: 1.5;
    cursor: pointer;
    text-align: left;
    display: flex;

    >div {
      margin-left: 1rem;
      transition: margin 0.2s ease-in-out;
    }

    &:hover {
      color: rgb(190,190,255);
      >div {
        margin-left: 1.5rem;
      }
    }
  }

  @media (max-width: 963px) {
    width: 100%;
    margin: 10% auto 0;
  }
`;

const ModalBackground = styled.div`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 85%;
  height: 85%;
  max-width: 1200px;
  background: rgba(235,225,255,1);
  border-radius: 2rem;
  filter: drop-shadow(0 0 10px #000);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4rem;
  color: #456;
  display: flex;
  gap: 3rem;

  @media (max-width: 963px) {
    flex-direction: column;
    overflow-y: auto;
  }

  @media (max-width: 519px) {
    padding: 2.5rem;
  }
`;

const ModalText = styled.div`
  width: 40%;
  overflow-y: auto;

  >h3 {
    margin-bottom: 2rem;
    font-size: 1rem;
    font-weight: 600;
  }

  >p {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
  }

  a {
    display: flex;
    margin-top: 2rem;

    > div {
      margin-left: 1rem;
      transition: margin 0.2s ease-in-out;
    }

    &:hover {
      color: #000;
      >div {
        margin-left: 1.5rem;
      }
    }
  }

  @media (max-width: 963px) {
    width: 100%;
    overflow-y: visible;
  }
`;

const ModalImage = styled.div`
  width: 60%;
  position: relative;

  @media (max-width: 963px) {
    width: 100%;
    max-width: 540px;
    margin: auto;
  }
`;

const ModalDesktopImage = styled.div`
  position: relative;
  width: 100%;
  max-height: 80%;
  overflow: hidden;
`;

const ModalMobileImage = styled.div`
  position: absolute;
  width: 30%;
  bottom: 0;
  right: 10%;
  filter: drop-shadow(-3px -3px 12px #000);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  span {
    display: block;
    width: 3px;
    height: 2rem;
    background: black;
    position: absolute;
    left: 50%;
    top: 50%;

    &:first-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &:hover {
    span {
      opacity: 0.6;
    }
  }

  @media (max-width: 519px) {
    width: 1.5rem;
    height: 1.5rem;

    span {
      height: 1.5rem;
    }
  }
`;

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  modalDescription: string;
  url: string;
}

interface ProjectProps {
  data: ProjectData;
}

const Project: React.FC<ProjectProps> = ({ data } : ProjectProps ) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log('data : ', data);
  return (
    <ProjectWrapper>
      <ProjectImage>
        <DesktopImage>
          <Image
            src={`/projects/${data.slug}/desktop/homepage_hero.png`}
            alt={`Screenshot of project ${data.title}`}
            width={1000}
            height={800}
          />
        </DesktopImage>
        <MobileImage>
          <Image
            src={`/projects/${data.slug}/mobile/homepage_hero.png`}
            alt={`Screenshot of project ${data.title}`}
            width={500}
            height={1000}
          />
        </MobileImage>
      </ProjectImage>
      <ProjectText>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <br/>
        <button onClick={openModal}>See more<div>›</div></button>
      </ProjectText>
      {modalOpen && (
        <ModalBackground onClick={closeModal}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <ModalText>
              <h3>{data.title}</h3>
              <p>{data.modalDescription}</p>
              <p><a href={data.url} target="_blank">Visit site<div>›</div></a></p>
            </ModalText>
            <ModalImage>
              <ModalDesktopImage>
                <Image
                  src={`/projects/${data.slug}/desktop/modal_image.png`}
                  alt={`Screenshot of project ${data.title}`}
                  width={1000}
                  height={800}
                />
              </ModalDesktopImage>
              <ModalMobileImage>
                <Image
                  src={`/projects/${data.slug}/mobile/modal_image.png`}
                  alt={`Screenshot of project ${data.title}`}
                  width={500}
                  height={1000}
                />
              </ModalMobileImage>
            </ModalImage>
            <ModalCloseButton onClick={closeModal}>
              <span></span>
              <span></span>
            </ModalCloseButton>
          </ModalWrapper>
        </ModalBackground>
      )}
    </ProjectWrapper>
  )
}

export default function Riverflow() {
  return (
    <RiverflowContainer>
      {projects.projects instanceof Array && projects.projects.map((project, i) => (
        <Project
          key={i}
          data={project}
        />
      ))}
    </RiverflowContainer>
  )
}
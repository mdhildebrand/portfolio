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

export default function Home() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <H1>Matt<br/>Hildebrand</H1>
      </ContentWrapper>
      <Orbit
        size={300}
        location="topRight"
        planet={Planet3}
      />
      <Orbit
        size={500}
        location="topRight"
        planet={Planet2}
      />
      <Orbit
        size={650}
        location="topRight"
        planet={Planet1}
      />
    </PageWrapper>
  );
}

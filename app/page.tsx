import Image from "next/image";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  // background: linear-gradient(45deg, #4466ff, #ee88cc);
  background: linear-gradient(45deg, #000055, #119988, #000055, #119988, #000055);
  background-size: 200vw 200vw;
  animation: run 10s linear infinite;

  @keyframes run {
    0%{ background-position: 0% 0% }
    100%{ background-position: 0% 200vw }
    // 100%{ background-position: 0% 0% }
  }
`;

const H1 = styled.h1`
  margin: auto;
  font-size: 100px;
  z-index: 100;
`;

export default function Home() {
  return (
    <PageWrapper>
      <H1>Matt Hildebrand</H1>
    </PageWrapper>
  );
}

import styled from "styled-components"

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: auto;
  
  > p {
    max-width: 90%;
    font-size: clamp(1rem, 3vw, 1.5rem);
    line-height: 1.5;
    margin-top: 3rem;

    > div {
      display: inline-flex;
      flex-direction: column;
      overflow: hidden;
      max-height: calc(clamp(1rem, 5vw, 1.75rem) + 5px);

      > div {
       display: none;

       &.active {
        display: block;
       }
      }
    }
  }
`;

const DownArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 4rem;
  height: 2rem;
  left: 50%;

  animation: bounce 1.5s infinite ease-in-out;

  @keyframes bounce {
    0% { transform: translate(-50%, 0%)}
    50% { transform: translate(-50%, 25%)}
    100% { transform: translate(-50%, 0%)}
  }

  span {
    display: block;
    width: 2rem;
    height: 3px;
    background: #fff;
    position: absolute;

    &:first-child {
      transform: translateX(-33%) rotate(45deg);
    }

    &:nth-child(2) {
      transform: translateX(33%) rotate(-45deg);
    }
  }
`;

export default function Hero(){
  return (
    <HeroContainer>
      <h1>Matt Hildebrand</h1>
      <h2>Web developer based in Vancouver, BC</h2>
      <p>I'm a web developer who's spent over five years building custom WordPress and React sites for clients, with experience ranging across education, real estate, and retail. I specialize in collaborating closely with designers to turn high-fidelity Figma designs into accessible, polished websites, with a focus on clean code and attention to detail.</p>
      <DownArrow>
        <span></span>
        <span></span>
      </DownArrow>
    </HeroContainer>
  )
}
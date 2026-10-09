import styled from "styled-components"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: auto;
  
  > .p {
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

export default function Hero(){
  return (
    <HeroContainer>
      <h1>Matt Hildebrand</h1>
      <h2>Web developer based in Vancouver, BC</h2>
      <div className="p">I'm a web developer who's spent over five years building custom WordPress and React sites for clients, with experience ranging across education, real estate, health, and retail. I specialize in collaborating closely with designers to turn high-fidelity Figma designs into fast, accessible, polished websites, with a focus on clean code and attention to detail.</div>
    </HeroContainer>
  )
}
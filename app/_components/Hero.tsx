import { useEffect } from "react";
import styled from "styled-components"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: calc(90vw - 100px);
  margin-right: auto;
  
  > .p {
    max-width: 75%;
    font-size: clamp(1rem, 5vw, 1.75rem);
    line-height: 1.2;

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
  useEffect(() => {
    const words = document.querySelectorAll("#wordSwap > div");
    let activeWord = 0;

    const rotateWords = (() => {
      if (words) {
        if (activeWord < words.length - 1) {
          activeWord++;
        } else {
          activeWord = 0;
        }
        words?.forEach((word) => {
          word.classList.remove('active');
        })
        words[activeWord].classList.add('active');
      }
    })

    const intervalInit = window.setInterval(rotateWords, 1000);

    return () => clearInterval(intervalInit);
  }, [])

  return (
    <HeroContainer>
      <h1>Matt Hildebrand</h1>
      <div className="p">Hi, welcome to my page! I'm a Web Developer, and I love <div id="wordSwap">
        <div className="active">building</div>
        <div>trying</div>
        <div>making</div>
        <div>discovering</div>
        <div>creating</div>
        <div>learning</div>
      </div> things.</div>
    </HeroContainer>
  )
}
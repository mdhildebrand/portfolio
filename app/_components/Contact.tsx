import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: clamp(5rem, 20vw, 10rem) auto;
  justify-content: center;
  
  > p {
    max-width: 75%;
    font-size: clamp(1rem, 5vw, 1.75rem);
    line-height: 1.2;
    margin-top: 1rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  margin-top: 4rem;
  gap: 4rem;

  a:hover {
    opacity: 0.7;
  }

  @media (max-width: 719px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export default function Contact(){
  return (
    <ContactContainer>
      <h2>Contact</h2>
      <ContactInfo>
        <p><a href="mailto:hildebrand.matt@gmail.com">hildebrand.matt@gmail.com</a></p>
        <p><a href="https://www.linkedin.com/in/matt-hildebrand-a75584204/" target="_blank">LinkedIn</a></p>
        <p><a href="https://github.com/mdhildebrand" target="_blank">Github</a></p>
      </ContactInfo>
    </ContactContainer>
  )
}
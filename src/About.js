import image from "./image.png";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <BioWrapper>
        <Bio>About me</Bio>
        <AboutImage src={image} alt="" />
        <div>
          <p></p>
        </div>
      </BioWrapper>
    </>
  );
};
export default About;

const AboutImage = styled.img`
  display: flex;
  justify-content: center;
  align-self: center;
  height: 400px;
  width: 300px;

  :hover {
    opacity: 20%;
  }
`;

const Bio = styled.h1`
  font-family: "Playball", cursive;
  background-color: yellow;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 400px) {
    background-color: yellow;
  }
`;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 400px) {
    display: flex;
    flex-direction: row;
  }
`;

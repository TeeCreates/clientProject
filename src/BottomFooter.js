import styled from "styled-components";
import elephants from "./elephants.jpg";
import { AiOutlineInstagram } from "react-icons/ai";

const BottomFooter = () => {
  return (
    <>
      <div
        style={{
          marginTop: "200px",
        }}
      >
        <ImageContainer>
          <Image src={elephants} alt="" />
          <Image src={elephants} alt="" />
        </ImageContainer>
        <Wrapper>
          <FollowMeDiv>
            <FollowSpan>Follow me</FollowSpan>
            <a href="https://www.instagram.com/sacreddrapes/">
              <AiOutlineInstagram size={30} />
            </a>
          </FollowMeDiv>
        </Wrapper>
      </div>
    </>
  );
};

export default BottomFooter;

const Wrapper = styled.div`
  background-color: rgba(238, 174, 202, 1);
  position: relative;

  display: flex;
  flex-direction: column;
  height: 80px;
  color: black;
  padding: 40px;
`;

const Image = styled.img`
  height: 10%;
  width: 10%;
`;

const ImageContainer = styled.div`
  font-family: "Playball", cursive;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: -10px;
  margin-top: 50px;
`;

const FollowMeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FollowSpan = styled.span`
  font-family: "Playball", cursive;
`;

// import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Upload } from "./Upload";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import image from "./image.png";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Loading } from "./Loading";

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("No messages");
  const [images, setImages] = useState("");
  const { accountEmail, setAccountEmail, section } = useContext(UserContext);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    setAccountEmail(user?.email);
  }, [accountEmail]);

  useEffect(() => {
    const getProtectedMsg = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        // console.log("token,", accessToken);
        fetch("/fetch-message", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }).then((res) => {
          if (res.status === 200) {
            return res.json().then((data) => setMessage(data.message));
          } else {
            setError(res.statusText);
          }
        });
      }
    };
    getProtectedMsg();
  });

  // get images

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const { data } = await res.json();
      // console.log(data);
      setImages(data);
    };
    fetchImages();
  }, []);
  // console.log(images);

  const { page } = useParams();

  useEffect(() => {
    if (page === "about") {
      // window.scrollTo({ top: "400px", left: 0, behavior: "smooth" });
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      console.log("page", page + "aboutref" + aboutRef.current);
    }
    // aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page, section]);

  useEffect(() => {
    if (page === "top") {
      // window.scrollTo({ top: "400px", left: 0, behavior: "smooth" });
      homeRef.current?.scrollIntoView({ behavior: "smooth" });
      console.log("page", page + "aboutref" + aboutRef.current);
    }
    // aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page, section]);

  const handleScroll = (ev) => {
    page = "top";
  };

  console.log(page);
  return (
    <div onScroll={handleScroll} ref={homeRef}>
      {images ? (
        <div style={{}}>
          <ImageContainer>
            {images
              ? images.map((image, index) => {
                  return <Img src={image.image} key={index}></Img>;
                })
              : null}
          </ImageContainer>

          <OverLay>
            <SacredDrapesTitle>Sacred Drapes</SacredDrapesTitle>
          </OverLay>
        </div>
      ) : (
        <Loading />
      )}

      {images ? (
        <BioWrapper ref={aboutRef}>
          <AboutImage src={image} alt="" />
          <div>
            <Bio>Hey There!</Bio>
            <BioParagraph>
              My name is Kishanna and I'm a saree draper. Growing up I was
              always enthusiact about learning my roots as a Tamil born and
              raised in Montreal, Canada. I've realized overtime as Tamils
              disperse all over the world, there is a lack in knowledge how to
              put together one of the most essential pieces of clothing which is
              rooted in our culture for centuries, a saree. Diaspora has
              affected many minority groups around the world. As little it may
              be, my goal is to style those in celebration to my best abilities
              as honourable as I could to represent their roots on their special
              day.
            </BioParagraph>
          </div>
        </BioWrapper>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Home;

const Img = styled.img`
  height: 320px;
  width: 279px;
  margin: 1px;
`;

const H1 = styled.h1`
  font-family: "Playball", cursive;
`;

const BioParagraph = styled.p`
  height: 100px;
  width: 400px;
`;

const AboutImage = styled.img`
  display: flex;
  justify-content: center;
  align-self: center;
  height: 30%;
  width: 30%;
`;

const Bio = styled.h1`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 50px;
  /* font-family: "Playball", cursive; */
  /* background-color: white; */
  display: flex;
  flex-direction: center;
  justify-content: center;

  transform: rotate(-4deg);

  /* @media screen and (min-width: 400px) {
    background-color: yellow;
  } */
`;

const BioWrapper = styled.div`
  margin-top: 30px;
  padding: 30px;
  display: flex;
  position: relative;
  top: -500px;
  justify-content: space-evenly;
  background-color: rgba(238, 174, 202, 0.2);

  align-items: flex-start;
  /* @media screen and (min-width: 400px) {
    display: flex;
    flex-direction: row;
  } */
  margin-bottom: -300px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 657px;
  width: 100%;
  margin-top: 10px;
  /* background-color: black; */
`;

const OverLay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 656px;
  width: 100%;
  position: relative;
  bottom: 659px;

  background: rgba(0, 0, 0, 0.5);

  :hover {
    background: rgba(0, 0, 0, 0.6);
  }

  /* 
  color: rgb(238, 174, 202);
  color: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  ); */
`;

const SacredDrapesTitle = styled.span`
  color: rgb(238, 174, 202);
  font-size: 140px;
  font-family: "Playball", cursive;
  z-index: 2;

  :hover {
    transform: translate(0);
  }
`;

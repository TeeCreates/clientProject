import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Login } from "./Login";
import { useRef } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { GoCalendar } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { section, setSection } = useContext(UserContext);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { logout } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  let history = useHistory();
  const checkLogin = () => {
    history.push("/login");
  };

  const HomeBtn = () => {
    history.push("/");
  };
  //navlink styling
  // const styledLinks = {
  //   marginRight: "5px",
  //   textDecoration: "none",
  //   color: "black"
  // };

  const aboutRef = useRef(null);
  return (
    <Wrapper>
      <NavBarContainter>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          activeStyle={{ borderBottom: "solid 3px #fff" }}
          strict
          to="/home/top"
          onClick={() => setSection(!section)}
        >
          Home
        </NavLink>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          activeStyle={{ borderBottom: "solid 3px #fff" }}
          exact
          to="/home/about"
          // onClick={() => {
          //   aboutRef.current?.scrollIntoView({ behavior: "smooth" });
          // }}
          onClick={() => setSection(!section)}
        >
          About
        </NavLink>
        <NavLink
          style={{ marginRight: "5px", textDecoration: "none", color: "white" }}
          activeStyle={{ borderBottom: "solid 3px #fff" }}
          exact
          to="/calender"
        >
          <GoCalendar />
        </NavLink>
        {isAuthenticated ? (
          <NavLink
            to="/profile"
            style={{
              marginRight: "5px",
              textDecoration: "none",
              color: "white",
            }}
            activeStyle={{ borderBottom: "solid 3px #fff" }}
          >
            <FiUser />
          </NavLink>
        ) : null}
        {!isAuthenticated ? (
          <LoginLogout>
            {" "}
            <Login />
          </LoginLogout>
        ) : null}
        {isAuthenticated ? (
          <LoginLogout
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <FiLogOut />
          </LoginLogout>
        ) : null}
      </NavBarContainter>
      <H1> Sacred Drapes</H1>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  height: 40px;
  align-self: center;
  padding-right: 80px;
  padding-top: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const LoginLogout = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const NavBarContainter = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: white;
`;

const H1 = styled.h1`
  font-family: "Playball", cursive;
  font-size: 30px;
  position: absolute;
  left: 10px;
  top: -20px;
`;

const ToolTip = styled.div`
  background-color: black;
  opacity: 60%;
  color: white;
  border-radius: 5px;
  position: absolute;
  top: 28px;
  right: 115px;
  visibility: hidden;
  :hover {
    visibility: visible;
    opacity: 1;
  }
`;

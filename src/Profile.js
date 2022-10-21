import React from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { Bookings } from "./Booking";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import { Loading } from "./Loading";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { accountEmail, userBookings } = useContext(UserContext);
  // useEffect(() => {
  //   fetch(`/api/bookings/${user.email}`, {
  //     method: "GET",
  //     header: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <div>
          <Hey>Hey</Hey> <span>{user.email},</span>
        </div>
        {user.email ? <Bookings /> : "Loading"}
      </div>
    )
  );
};

export default Profile;

const Hey = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 50px;
  margin-left: 30px;
`;

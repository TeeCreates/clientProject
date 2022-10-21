import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { DomainBookings } from "./DomainBookings";
import { Loading } from "./Loading";
import styled from "styled-components";
import axios, * as others from "axios";

export const Bookings = () => {
  const {
    domainBookings,
    setDomainBookings,
    accountEmail,
    userBookings,
    setUserBookings,
  } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [deleted, setDeleted] = useState(true);

  //get non domain user's bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      // await fetch(`/api/bookings/${accountEmail}`, {
      //   method: "GET",
      //   header: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // })
      const res = await axios({
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "get",
        url: `https://serverproject-production.up.railway.app/api/bookings/${accountEmail}`,
      });
      setUserBookings(res.data);
      console.log(res.data, "DID IT WORK?");
      // .then((res) => {
      //   return res.json();
      // })
      // .then((data) => {
      //   setUserBookings(data.data);
      //   console.log(data.data);
      // });
    };
    if (deleted) {
      fetchUserBookings();
      setDeleted(false);
    }
  }, [accountEmail, deleted, isAuthenticated]);

  // console.log(user.email);

  // console.log(userBookings);

  const deleteBooking = async (bookingId, index) => {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("removed");
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Wrapper>
        <span>Booking List</span>
        <span>Date</span>
        <span>Service</span>
        <span>Edit</span>
      </Wrapper>
      {userBookings && user.email !== "thajanah_mk@hotmail.com" ? (
        userBookings.map((booking, index) => {
          console.log(booking.date);
          return (
            <BookingBox key={index}>
              <Index>{index + 1}</Index>
              <span>{booking.date}</span>
              <span>{booking.services}</span>
              <DeleteBtn onClick={() => deleteBooking(booking._id, index)}>
                delete
              </DeleteBtn>
            </BookingBox>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

const BookingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: black 1px solid;
  padding: 20px;
  margin: 20px;
  background-color: rgba(238, 174, 202, 0.2);
  align-items: center;
  -webkit-box-shadow: 0px 4px 16px -2px rgba(0, 0, 0, 0.64);
  box-shadow: 0px 4px 16px -2px rgba(0, 0, 0, 0.64);
`;

const Index = styled.span`
  border-right: black 1px solid;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 45px;
  margin-top: 10px;
  margin-left: 30px;
`;

const DeleteBtn = styled.button`
  background-color: white;
  padding: 10px;
`;

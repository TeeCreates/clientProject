import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const DomainBookings = () => {
  const { domainBookings, setDomainBookings } = useContext(UserContext);

  //get all bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      await fetch("/api/bookings/", {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDomainBookings(data.data);
        });
    };
    fetchUserBookings();
  }, []);

  console.log("domain bookings", domainBookings);

  const updateBooking = (booking) => {
    fetch(`/api/update/${booking._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",

      // Sending only the fields that to be updated
      body: JSON.stringify({
        confirm: true,
      }),
    })
      .then(function (response) {
        // Console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };
  return (
    <div>
      {domainBookings
        ? domainBookings.map((booking, index) => {
            return (
              <div key={index}>
                <span>{booking.date}</span>
                <span>{booking.firstName}</span>
                <span>{booking.lastname}</span>
                <span>{booking.email}</span>
                <button onClick={() => updateBooking(booking)}>Confirm</button>
                <button>Decline</button>
              </div>
            );
          })
        : null}
    </div>
  );
};

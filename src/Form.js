import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Services } from "./Services";

export const Form = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedDate } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let history = useHistory();

  const submitHandler = (event) => {
    console.log(selectedDate);
    event.preventDefault();
    if (!firstName || !lastName || !service || !phoneNumber) {
      setMessage("Please fill the required fields");
    } else if (!selectedDate) {
      setMessage("Select the booking date");
    } else {
      fetch("/api/add-booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          month: selectedDate.split(" ")[0],
          day: selectedDate.split(" ")[1],
          year: selectedDate.split(" ")[2],
          email: user.email,
          month: selectedDate.split(" ")[1],
          services: service,
          date: selectedDate,
          confirm: false,
          phone: phoneNumber,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          history.push("/confirmed");
          console.log(response);
        });
    }
    // if (firstName && lastName && service && selectedDate) {
    //   history.push("/confirmed");
    // }
  };

  useEffect(() => {
    console.log(service);
  }, [service]);

  /// form validation
  console.log("field test", firstName, lastName, service);

  return (
    <>
      {!isAuthenticated ? (
        <>
          <div>
            <Title>Sacred Drapes</Title>
            <span>Please login to book the service</span>
          </div>
        </>
      ) : (
        <Wrapper>
          <FormContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              <Title>Sacred Drapes</Title>
            </div>
            {selectedDate ? (
              <p>
                {" "}
                Date Selected:
                {selectedDate}
              </p>
            ) : (
              <p>Click on the date you wish to book the service</p>
            )}
            <label>
              {" "}
              Firstname:
              <InputBox
                type="text"
                placeholder="Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
            <label>
              {" "}
              Lastname:
              <InputBox
                type="text"
                placeholder="lastname"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
            <label>
              {" "}
              Phone:
              <InputBox
                type="text"
                placeholder="phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </label>

            <div>
              <select onChange={(e) => setService(e.target.value)}>
                <option value="0">Select Service</option>
                <option value="Draping">Draping</option>
                <option value="Tassles">Tassles</option>
                <option value="Drapping + Tassles">Drapping + Tassles</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <label>
              {" "}
              <AdditionalDetailsBox
                type="text"
                placeholder="additional details"
                onChange={(e) => setAdditionalDetails(e.target.value)}
                value={additionalDetails}
              />
            </label>
            <SubmitButton onClick={submitHandler}>Confirm Booking</SubmitButton>

            {message ? <Message>{message}</Message> : null}
            <Services />
          </FormContainer>
        </Wrapper>
      )}
    </>
  );
};

const Title = styled.p`
  font-family: "Playball", cursive;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500;
  padding: 20px;
  width: 250px;

  position: absolute;
  right: 4px;
  top: 4px;
  background-color: #e6e6fa;
  z-index: 0;

  -webkit-box-shadow: 0px 4px 16px -2px rgba(0, 0, 0, 0.64);
  box-shadow: 0px 4px 16px -2px rgba(0, 0, 0, 0.64);
`;

const Wrapper = styled.div`
  background-color: #e6e6fa;
  width: 300px;
  height: 530px;
  position: absolute;
  right: 10%;
  border-radius: 8px;
`;

const Message = styled.span`
  color: red;
`;

const AdditionalDetailsBox = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 8px;
  border: black 0.5px solid;
  margin-top: 5px;
`;

const InputBox = styled.input`
  height: 30px;
  width: 240px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: black 0.5px solid;
  :focus {
    border-color: #ffc0cb;
  }
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  background-color: white;
  height: 30px;
  width: 258px;
  border: black 0.5px solid;
  border-radius: 5px;

  :hover {
    background-color: black;
    color: white;
    border: white 0.5px solid;
    cursor: pointer;
  }
`;

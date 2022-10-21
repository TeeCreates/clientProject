import { useContext } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ConfirmationPage = () => {
  const { setSeletectedDate } = useContext(UserContext);
  let history = useHistory();

  setSeletectedDate("");

  const submit = () => {
    history.push("/home/top");
  };
  return (
    <ThankYouContainer>
      <ThankYou>Thank you! </ThankYou>
      <span>
        You'll receive a call within 24 hours to discuss the services.
      </span>
      <p>Talk soon!(: </p>
      <span>-Kishanna</span>
      <GoHome onClick={() => submit()}>Go Home</GoHome>
    </ThankYouContainer>
  );
};

export default ConfirmationPage;

const ThankYou = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 50px;
`;

const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  justify-content: center;
`;

const GoHome = styled.button`
  margin-top: 70px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;

  :hover {
    background-color: rgba(238, 174, 202, 0.2);
    cursor: pointer;
  }
`;

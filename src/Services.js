import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

export const Services = () => {
  return (
    <>
      <ServiceBox>
        <p>Prices: </p>
        <Price>
          Tassles <span>35$</span>
        </Price>
        <Price>
          Drapping <span>40$</span>
        </Price>
        <Price>
          Make-up <span>30$</span>
        </Price>
      </ServiceBox>
    </>
  );
};

const ServiceBox = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 15px;
  /* border: rgb(238, 174, 202) 1px solid; */
`;

const Price = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

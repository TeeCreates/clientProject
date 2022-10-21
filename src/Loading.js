import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Loading = () => {
  return (
    <LoadingStyle>
      <div>
        <CircularProgress></CircularProgress>
      </div>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  height: 100vh;
  width: 90vw;
  /* background-color: aliceblue; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 5rem;
`;

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <span onClick={() => loginWithRedirect()}>Login</span>
    </>
  );
};

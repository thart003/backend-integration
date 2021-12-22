import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/auth";

export const SecurePage = (props) => {
  const auth = useAuth();
  const history = useHistory();

  React.useEffect(() => {
    if (auth.token === null) {
      history.push("login");
    }
  }, [auth.token]);

  return <div>{props.children}</div>;
};

import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import LoginDialog from "./LoginDialogue";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() =>
        !!currentUser ? <RouteComponent /> : <LoginDialog redirect />
      }
    />
  );
};

export default PrivateRoute;

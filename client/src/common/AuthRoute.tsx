import React from "react";
import { Route } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type Props = {
  Component: React.ComponentType<any>;
  path: string;
  exact: boolean;
};

const AuthRoute = ({ Component, path, exact }: Props) => {
    // Redux
    const authenticated = useAppSelector(state => state.user.authenticated)

  return <Route exact path={path} render={(props) => {
      if(authenticated){
        return <Component {...props} />
      }
      else {
        window.location.href = '/login'
      }
  }} />;
};

export default AuthRoute;

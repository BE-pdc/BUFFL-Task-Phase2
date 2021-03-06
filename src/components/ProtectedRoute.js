import React from 'react';
import { Route, Redirect } from 'react-router';

const ProtectedRoute = ({
  isAuth,
  loggedInAs,
  setLoggedInAs,
  setIsAuth,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return (
            <Component
              loggedInAs={loggedInAs}
              setLoggedInAs={setLoggedInAs}
              setIsAuth={setIsAuth}
            />
          );
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

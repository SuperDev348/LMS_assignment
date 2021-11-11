import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import {getCookie} from '../service/cookie'
import {getAuth} from '../service/string'

export const AuthRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie('auth'))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth ? (
          children
        ) : (
          (
            auth?.role === 'owner' ?
            (
              <Redirect
                to={{
                  pathname: '/assignment',
                  state: { from: location },
                }}
              />
            ):
            (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )
          )
        )
      }
    />
  );
}

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie('auth'))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const PrivateOwnerRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie("auth"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          auth?.role === "owner" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const PrivateAdminRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie('auth'))
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ?
          (auth?.role === 'admin' ?
          (
            children
          ) :
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const PrivateCompanyRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie("auth"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          auth?.role === "company" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const PrivateCompanyAdminRoute = ({ children, ...rest }) => {
  const auth = getAuth(getCookie("auth"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          (auth?.role === "company" || auth?.role === 'companyAdmin') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

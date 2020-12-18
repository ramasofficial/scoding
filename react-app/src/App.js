import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { apiClientOn } from "./services/api";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem("loggedIn") === "true" || false
  );

  const [accessToken, setAccessToken] = React.useState(
    sessionStorage.getItem("accessToken") !== ""
      ? sessionStorage.getItem("accessToken")
      : false
  );

  const login = (props) => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", true);

    setAccessToken(props.access_token);
    sessionStorage.setItem("accessToken", props.access_token);
  };

  const logout = () => {
    apiClientOn({ accessToken: accessToken })
      .post("api/logout")
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(false);
          sessionStorage.setItem("loggedIn", false);

          setAccessToken(false);
          sessionStorage.setItem("accessToken", false);
        }
      });
  };

  const authLink = (props) => {
    if (props.loggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link nav_pointer" onClick={logout}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <React.Fragment>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/login"
              exact={true}
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/register"
              exact={true}
            >
              Register
            </NavLink>
          </li>
        </React.Fragment>
      );
    }
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          React app
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/"
                exact={true}
              >
                Home
              </NavLink>
            </li>
            {authLink({ loggedIn: loggedIn })}
          </ul>
        </div>
      </nav>

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} loggedIn={loggedIn} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

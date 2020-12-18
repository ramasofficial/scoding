import React from "react";
import { Redirect } from "react-router-dom";
import { apiClient } from "../services/api";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectToHome, setRedirectToHome] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthError(false);

    apiClient
      .post("api/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          props.login(response.data);
          setRedirectToHome(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          setAuthError(error.response.data);
        } else {
          setAuthError("Server is not connected, please try again later.");
        }
      });
  };

  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container login_container">
      <div className="card">
        <div className="card-header">
          <strong>Login</strong>
        </div>
        <div className="card-body">
          {authError ? (
            <div className="alert alert-danger">{authError}</div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={email}
                className={"form-control" + (authError ? " is-invalid" : "")}
                placeholder="Input your email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={password}
                className={"form-control" + (authError ? " is-invalid" : "")}
                placeholder="Input your password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

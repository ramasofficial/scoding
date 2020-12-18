import React from "react";
import { Redirect } from "react-router-dom";
import { apiClient } from "../services/api";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setRegisterError(false);

    apiClient
      .post("api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 201) {
          setRedirectToLogin(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          let errorResponse = JSON.parse(JSON.stringify(error.response.data));
          setRegisterError(errorResponse);
        } else {
          setRegisterError("Server is not connected, please try again later.");
        }
      });
  };

  if (redirectToLogin === true) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container register_container">
      <div className="card">
        <div className="card-header">
          <strong>Register</strong>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={name}
                className={
                  "form-control" +
                  (registerError.errors && registerError.errors.name
                    ? " is-invalid"
                    : "")
                }
                placeholder="Input your name..."
                onChange={(e) => setName(e.target.value)}
                required
              />
              {registerError.errors && registerError.errors.name ? (
                <div className="alert alert-danger register_alert" role="alert">
                  {registerError.errors.name}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={email}
                className={
                  "form-control" +
                  (registerError.errors && registerError.errors.email
                    ? " is-invalid"
                    : "")
                }
                placeholder="Input your email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {registerError.errors && registerError.errors.email ? (
                <div className="alert alert-danger register_alert" role="alert">
                  {registerError.errors.email}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={password}
                className={
                  "form-control" +
                  (registerError.errors && registerError.errors.password
                    ? " is-invalid"
                    : "")
                }
                placeholder="Input your password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {registerError.errors && registerError.errors.password ? (
                <div className="alert alert-danger register_alert" role="alert">
                  {registerError.errors.password}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

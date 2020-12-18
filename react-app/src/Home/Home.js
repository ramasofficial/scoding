import React from "react";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  if(!props.loggedIn) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="container main_container">
        <div className="card">
          <div className="card-header">
            <strong>Home page</strong>
          </div>
          <div className="card-body text-center">
            Hi {props.user.name}, you are logged in!<br/>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;

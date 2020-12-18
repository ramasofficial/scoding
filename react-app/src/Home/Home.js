import React from "react";

const Home = (props) => {
  if(!props.loggedIn) {
    return (
      <div className="container main_container">
        <div className="card">
          <div className="card-header">
            <strong>Home page</strong>
          </div>
          <div className="card-body text-center">
            You need to logged in, if you want to see this page.
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container main_container">
        <div className="card">
          <div className="card-header">
            <strong>Home page</strong>
          </div>
          <div className="card-body text-center">
            Hi Jonas, you are logged in!<br/>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;

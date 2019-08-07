import React, { Component } from "react";
import { Button } from "react-bootstrap";

interface ILoginStates {}

class Login extends Component<any, ILoginStates> {
  public render() {
    return (
      <div id="login-parent">
        <div id="login-button-container">
          <div className="login-button-wrapper">
            <Button variant="primary" disabled={true}>
              Login
            </Button>
          </div>
          <div className="login-button-wrapper">
            <Button variant="outline-primary">View Demo</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

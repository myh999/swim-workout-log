import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Auth from "../services/Auth";

interface ILoginStates {}

class Login extends Component<any, ILoginStates> {
  public render() {
    return (
      <div id="login-parent">
        <div id="login-button-container">
          <div className="login-button-wrapper">
            <Button variant="primary" onClick={this.onLogin}>
              Login
            </Button>
          </div>
          <div className="login-button-wrapper">
            <Button variant="outline-primary" onClick={this.onDemo}>
              View Demo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private onLogin = () => {
    Auth.signIn("myh.999@gmail.com", "password").then((result: boolean) => {
      if (result === true) {
        this.props.history.push("/home");
      }
    });
  };

  private onDemo = () => {
    this.props.history.push("/home");
  };
}

export default Login;

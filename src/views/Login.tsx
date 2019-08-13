import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Auth from "../services/Auth";
import { LoginType } from "../constants/enums";
import LoginModal from "../containers/LoginModal";

interface ILoginStates {
  showLoginModal: boolean;
  loginType: LoginType;
}

class Login extends Component<any, ILoginStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLoginModal: false,
      loginType: LoginType.LOGIN
    };
  }

  public render() {
    return (
      <>
        <div id="login-parent">
          <div id="login-button-container">
            <div className="login-button-wrapper">
              <Button variant="primary" onClick={this.onShowLoginModal}>
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
        <LoginModal
          show={this.state.showLoginModal}
          type={this.state.loginType}
          onClose={this.onCloseLoginModal}
          onLogin={null}
        />
      </>
    );
  }

  private onShowLoginModal = () => {
    this.setState({
      showLoginModal: true
    });
  };

  private onCloseLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  private onDemo = () => {
    this.props.history.push("/home");
  };
}

export default Login;

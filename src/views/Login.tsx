import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { LoginType } from "../constants/enums";
import LoginModal from "../containers/LoginModal";
import firebase from "firebase";

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

  public componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.redirectHome();
      }
    });
  };

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
              <Button
                variant="outline-primary"
                onClick={this.onShowCreateUserModal}
              >
                Create User
              </Button>
            </div>
            <div className="login-button-wrapper">
              <Button variant="secondary" onClick={this.redirectHome}>
                View Demo
              </Button>
            </div>
          </div>
        </div>
        <LoginModal
          show={this.state.showLoginModal}
          type={this.state.loginType}
          onClose={this.onCloseLoginModal}
          onLogin={this.redirectHome}
        />
      </>
    );
  }

  private onShowCreateUserModal = () => {
    this.setState({
      showLoginModal: true,
      loginType: LoginType.CREATE_USER
    });
  };

  private onShowLoginModal = () => {
    this.setState({
      showLoginModal: true,
      loginType: LoginType.LOGIN
    });
  };

  private onCloseLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  private redirectHome = () => {
    this.props.history.push("/home");
  };
}

export default Login;

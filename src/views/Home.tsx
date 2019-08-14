import React, { Component } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import Auth from "../services/Auth";
import LoginModal from "../containers/LoginModal";
import { LoginType } from "../constants/enums";

interface IHomeStates {
  user?: firebase.User;
  showLoginModal: boolean;
  loginType: LoginType;
}

class Home extends Component<any, IHomeStates> {
  constructor(props: any) {
    super(props);
    const user: firebase.User | null = Auth.getSignedInUser();
    this.state = {
      user: user !== null ? user : undefined,
      showLoginModal: false,
      loginType: LoginType.LOGIN
    };
  }

  public render() {
    return (
      <>
        <Container id="home-parent">
          <Row>
            {this.state.user
              ? `Logged in as: ${this.state.user.email}`
              : "Not logged in"}
          </Row>
          <Row>
            <Button variant="primary" onClick={this.handleAuth}>
              {this.state.user ? "Log Out" : "Login"}
            </Button>
          </Row>
          <Row>
            <Form onSubmit={this.onUploadImage}>
              <Form.Group controlId="uploadImage">
                <Form.Label>Password</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload File
              </Button>
            </Form>
          </Row>
        </Container>
        <LoginModal
          show={this.state.showLoginModal}
          type={this.state.loginType}
          onClose={this.onCloseLoginModal}
          onLogin={this.onLogin}
        />
      </>
    );
  }

  private onUploadImage = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget[0].files[0]);
  };

  private onLogin = () => {
    const user: firebase.User | null = Auth.getSignedInUser();
    this.setState({
      user: user !== null ? user : undefined,
      showLoginModal: false
    });
  };

  private onCloseLoginModal = () => {
    this.setState({
      showLoginModal: false
    });
  };

  private handleAuth = () => {
    if (this.state.user) {
      Auth.signOut().then(() => {
        this.props.history.push("/");
      });
    } else {
      this.setState({
        showLoginModal: true
      });
    }
  };
}

export default Home;

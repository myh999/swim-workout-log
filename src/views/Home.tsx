import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Form,
  Col,
  ProgressBar
} from "react-bootstrap";
import Auth from "../services/Auth";
import LoginModal from "../containers/LoginModal";
import { LoginType } from "../constants/enums";
import firebase from "firebase";
import Vision from "../services/Vision";

interface IHomeStates {
  user?: firebase.User;
  showLoginModal: boolean;
  loginType: LoginType;
  loadingText?: string;
  loadingProgress?: number;
  tesseractText?: string;
  fileName?: string;
}

class Home extends Component<any, IHomeStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLoginModal: false,
      loginType: LoginType.LOGIN
    };
  }

  public componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user !== null ? user : undefined
      });
    });
  };

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
                <Form.Control type="file" accept=".bmp,.jpg,.png,.pbm" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload File
              </Button>
            </Form>
          </Row>
          {this.renderLoadingBar()}
          <Row>{this.state.fileName}</Row>
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

  private renderLoadingBar = () => {
    if (this.state.loadingText) {
      return (
        <Row>
          <Col xs="3">{this.state.loadingText}</Col>
          <Col>
            <ProgressBar animated now={this.state.loadingProgress} />
          </Col>
        </Row>
      );
    } else {
      return <Row>{this.state.tesseractText}</Row>;
    }
  };

  private onUploadImage = (e: any) => {
    e.preventDefault();
    this.setState({
      fileName: e.currentTarget[0].files[0].name
    });
    this.getText(e.currentTarget[0].files[0]);
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

  private getText(image: File) {
    Vision.getTextFromImage(image);
  }
}

export default Home;

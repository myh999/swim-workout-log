import React, { Component } from "react";
import { LoginType } from "../constants/enums";
import { Modal, Form, Button, Collapse, Alert } from "react-bootstrap";
import Auth from "../services/Auth";

interface ILoginModalProps {
  show: boolean;
  type: LoginType;
  onClose: any;
  onLogin: any;
}

interface ILoginModalStates {
  error?: string;
}

class LoginModal extends Component<ILoginModalProps, ILoginModalStates> {
  constructor(props: ILoginModalProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Modal centered show={this.props.show} onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.type === LoginType.LOGIN ? "Login" : "Create User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                Enter a valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {this.renderConfirmPassword()}
            <Button variant="primary" type="submit">
              {this.props.type === LoginType.LOGIN ? "Login" : "Create User"}
            </Button>
          </Form>
          <br />
          <Collapse in={this.state.error !== undefined}>
            <div>
              <Alert variant="danger">{this.state.error}</Alert>
            </div>
          </Collapse>
        </Modal.Body>
      </Modal>
    );
  }

  private renderConfirmPassword = () => {
    if (this.props.type === LoginType.CREATE_USER) {
      return (
        <Form.Group controlId="loginConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
      );
    } else {
      return null;
    }
  };

  private onClose = () => {
    this.setState({
      error: undefined
    });
    this.props.onClose();
  };

  private handleSubmit = (e: any) => {
    e.preventDefault();
    if (this.props.type === LoginType.LOGIN) {
      Auth.signIn(e.currentTarget[0].value, e.currentTarget[1].value).then(
        (err?: string) => {
          if (err) {
            this.setState({
              error: err
            });
          } else {
            this.props.onLogin();
          }
        }
      );
    } else {
      if (e.currentTarget[1].value === e.currentTarget[2].value) {
        Auth.createUser(
          e.currentTarget[0].value,
          e.currentTarget[1].value
        ).then((err?: string) => {
          if (err) {
            this.setState({
              error: err
            });
          } else {
            this.props.onLogin();
          }
        });
      } else {
        this.setState({
          error: "Password and Confirm Password must match"
        });
      }
    }
  };
}

export default LoginModal;

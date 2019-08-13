import React, { Component } from "react";
import { LoginType } from "../constants/enums";
import { Modal, Form, Button } from "react-bootstrap";

interface ILoginModalProps {
  show: boolean;
  type: LoginType;
  onClose: any;
  onLogin: any;
}

class LoginModal extends Component<ILoginModalProps> {
  public render() {
    return (
      <Modal centered show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.type === LoginType.LOGIN ? "Login" : "Create User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                Enter a valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {this.props.type === LoginType.LOGIN ? "Login" : "Create User"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  public handleSubmit = (e: any) => {
      e.preventDefault();
    console.log(e.currentTarget[1].value);
  };
}

export default LoginModal;

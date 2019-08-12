import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Auth from "../services/Auth";

interface IHomeStates {}

class Home extends Component<any, IHomeStates> {
  public render() {
    return (
      <div id="home-parent">
        <Button variant="primary" onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  private signOut() {
    Auth.signOut().then(() => {
      this.props.history.push("/");
    });
  }
}

export default Home;

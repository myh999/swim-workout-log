import React from "react";
import "./sass/App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";

function App() {
  return (
      <Router>
        <Route exact path="/" component={Login} />
      </Router>
  );
}

export default App;

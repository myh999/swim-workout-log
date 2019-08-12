import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
    </Router>
  );
}

export default App;

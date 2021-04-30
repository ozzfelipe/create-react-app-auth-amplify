import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import HomeScreen from "./app/screens/HomeScreen";
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HomeScreen />
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);

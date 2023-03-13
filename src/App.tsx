import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { socket, WebsocketProvider } from "./contexts/WebsocketContext";
import { WebsocketComponent } from "./components/WebsocketComponent";

function App() {
  return (
  <WebsocketProvider value={socket}>
    <WebsocketComponent />
  </WebsocketProvider>);
}

export default App;

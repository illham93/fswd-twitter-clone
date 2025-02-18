import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar"; 
import UserFeed from "./userFeed";

const Index = () => {
  return (
    <div>
        <Navbar />
        <UserFeed />
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement('div')),
  );
});
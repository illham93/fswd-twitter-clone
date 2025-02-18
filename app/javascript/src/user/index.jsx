import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar"; 


const Index = () => {
  return (
    <div>
        <Navbar />
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement('div')),
  );
});
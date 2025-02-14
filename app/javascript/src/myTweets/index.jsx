import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar"; 
import MyTweets from "./myTweets";
import './myTweets.scss';

const Index = () => {
  return (
    <div>
        <Navbar />
        <MyTweets />
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement('div')),
  );
});
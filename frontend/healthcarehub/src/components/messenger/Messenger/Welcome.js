import React, { useState, useEffect } from "react";
import Robot from "../../../assets/robot.gif";

function Welcome() {

  return (
    <div className="welcome"  >
    <img src={Robot} alt="" />
      <h1>
        Welcome, <span>!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

export default Welcome;
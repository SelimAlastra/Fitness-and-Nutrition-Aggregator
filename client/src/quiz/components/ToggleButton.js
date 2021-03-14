import React, { useState } from 'react';
import '../styling/quizUser.css';

const Button = (props) => {
    const [color, setColors] = React.useState("");
    const [active, setActive] = React.useState(false);

    /**
     * change button style on click
     */
    const handleClickButton = (name) => {
      setActive(true);
      setColors(name);
      
      if (active === true) {
        setActive(false);
        setColors("");
      }
    };
  
    if(props.answerOption.selected === true){
        return (
          //for using the handleClickButton, you must add the following: className={`${color}, ...}
          <button className={`toggleButton`}> {props.answerText} </button> 
        );
    } else { 
        return (
          <button onClick={() => {handleClickButton("toggleButton"); props.handleAnswerButtonClick(props.answerOption)} }> {props.answerText} </button>
        );
    }
};

  export default Button;
import React from 'react';
import './App.css';

function Person() {
  const color  = `white`; //`hsl( ${Math.random()*360}, 0%, ${Math.random()*35+30}%`;
  const opacity = `${Math.random()*0.3+.2}`
  const text = 'This could have been someone you know.'

  return (
    <div className="person">
      <i className="fas fa-male fa-3x" style={{color : color, opacity: opacity}}></i>
      <span class="tooltiptext">{text}</span>
    </div>
  )

}

export default Person;
import React from 'react';

var fontSize_ = (window.innerWidth <= 520) ? '25px' : '36px';

export function Square(props) { // active or not 
  const name=(props.value) ? "active-square" : "square";
  function color(value) { 
    switch (value) {
      case 2    : return {background: '#eee4da'};
      case 4    : return {background: '#ede0c8'};
      case 8    : return {background: '#f2b179'};
      case 16   : return {background: '#f59563', color: '#f9f6f2'};
      case 32   : return {background: '#f67c5f', color: '#f9f6f2'};
      case 64   : return {background: '#f65e3b', color: '#f9f6f2'};
      case 128  : return {background: '#edcf72', color: '#f9f6f2'};
      case 256  : return {background: '#edcc61', color: '#f9f6f2'};
      case 512  : return {background: '#edc850', color: '#f9f6f2', 'box-shadow': '0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286)' };
      case 1024 : return {background: '#edc53f', color: '#f9f6f2', 'font-size': fontSize_, 'box-shadow': '0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)'};
      case 2048 : return {background: '#edc22e', color: '#f9f6f2', 'font-size': fontSize_};
      case 4096 : return {background: '#edc850', color: '#f9f6f2', 'font-size': fontSize_};
    }
  }
  return (
    <div className={name} style={color(props.value)}>
      <div className="number">
        {(props.value) ? props.value : null}
      </div>
    </div>
  );
}
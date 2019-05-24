import React from 'react';
import {matrixAt} from './matrix.js';

var display_ = 'none';

var marginLeft_number = (window.innerWidth <= 520) ? 
                        Math.floor((window.innerWidth - 275)/2) : 
                        Math.floor(window.innerWidth - 415)/2;
var fontSize_ = (window.innerWidth <= 520) ? '25px' : '36px';
var marginLeft_ = parseInt(marginLeft_number) + 'px';

function Square(props) { // active or not 
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

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      display_ : 'none',
    };
  }
  render() {
    return (
      <div className="score-board">
        {(this.props.canMove) ? ('SCORE\n' + this.props.score) : 'Cannot Move!'}
      </div>
    );
  }
}

export default class Board2048 extends React.Component {
  renderSquare(i) {
    return (
      <Square value={matrixAt(this.props.matrix, i)}/>
    );
  }

  _displayHowToPlay() {
    display_ = 'block';
    this.setState({display_: 'block'});
  }
  _notDisplayHowToPlay() {
    display_ = 'none';
    this.setState({display_: 'none'});
  }

  render() {
    return (
      <div className="gameContainer" style={{marginLeft: marginLeft_}}>
          <div className="header">
            <text className="text2048">2 0 4 8</text>
            <a 
              className="howToPlay" 
              onMouseOver={this._displayHowToPlay.bind(this)}
              onMouseOut={this._notDisplayHowToPlay.bind(this)}
              onTouchStart={this._displayHowToPlay.bind(this)}
              onTouchEnd={this._notDisplayHowToPlay.bind(this)}
            >
              How to Play
            </a>

            <div style={{display: display_}}>
              💻 <strong>Computer Users</strong> can use key 
                <strong> 'w,a,s,d' or 'arrow keys'</strong> to move the tiles.<br/>
              📱 <strong>Mobile Users</strong> can <strong>swipe the screen</strong> to move the tiles.
            </div>
          </div>
          {this.props.restartButton}
          <div className="buttonContainer">
              <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
          </div>
          

          <div id="fixed" className="board" >
              <div className="board-row">
                  {this.renderSquare(0)}
                  {this.renderSquare(1)}
                  {this.renderSquare(2)}
                  {this.renderSquare(3)}
              </div>
              <div className="board-row">
                  {this.renderSquare(4)}
                  {this.renderSquare(5)}
                  {this.renderSquare(6)}
                  {this.renderSquare(7)}
              </div>
              <div className="board-row">
                  {this.renderSquare(8)}
                  {this.renderSquare(9)}
                  {this.renderSquare(10)}
                  {this.renderSquare(11)}
              </div>
              <div className="board-row">
                  {this.renderSquare(12)}
                  {this.renderSquare(13)}
                  {this.renderSquare(14)}
                  {this.renderSquare(15)}
              </div>
              <ScoreBoard 
                  score={this.props.score} 
                  full={this.props.full} 
                  canMove={this.props.canMove}
                  win2048={this.props.win2048}
                  win4096={this.props.win4096}
              />
          </div>
      </div>
    )
  }
}
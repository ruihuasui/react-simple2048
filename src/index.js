import React from 'react';
import ReactDOM from 'react-dom';
import Board2048 from './board.js';
import {
  setMatrix, 
  getRandomNum, 
  move, 
  selectAction,
} from './matrix.js';
import './index.css';

var map = {
  38: 0, // Up
  87: 0, // Up
  39: 1, // Right
  68: 1, // Right
  40: 2, // Down
  83: 2, // Down
  37: 3, // Left
  65: 3, // Left
};

var start = true;
var tsX = 0;
var tsY = 0;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this.swiping = false;

    this.state = {
      matrix  : Array(16).fill(0), 
      score   : 0,
      canMove : true,
      full    : false,
      win2048 : false,
      win4096 : false,
    };
  }

  _onTouchStart(e) {
    tsY = e.touches[0].clientY;
    tsX = e.touches[0].clientX;
  }

  _onTouchMove(e) {
    this.swiping = true;
  }

  _onTouchEnd(e) {
    if (!this.swiping) return;
    const action = selectAction(e, tsX, tsY);
    const matrix_ = this.state.matrix.slice();
    var score_ = this.state.score;
    const result = move(matrix_, action, score_);

    this.swiping = false;
    this.setState({
      canMove : result.canMove, 
      matrix  : result.matrix_, 
      score   : result.score_,
      full    : result.full,
      win2048 : result.win2048,
      win4096 : result.win4096,
    });
  }

  _onKeyDown(event) {
    const action = map[event.which];
    const matrix_ = this.state.matrix.slice();
    var score_ = this.state.score;
    const result = move(matrix_, action, score_);
    this.setState({
      canMove : result.canMove, 
      matrix  : result.matrix_, 
      score   : result.score_,
      full    : result.full,
      win2048 : result.win2048,
      win4096 : result.win4096,
    });
  }

  restart = () => {
    this.setState({
      matrix  : Array(16).fill(0),
      score   : 0,
      canMove : true,
      full    : false,
      win2048 : false,
      win4096 : false,
    }); 
    start = true;
  };

  render() {
    // check whether the matrix is full
    if (!this.state.full && this.state.canMove) {
      // generate number from 0-15
      var res1 = getRandomNum(this.state.matrix, 16, null);
      setMatrix(this.state.matrix, res1.num, res1.index);
      if (start) {
        start = false;
        var res2 = getRandomNum(this.state.matrix, 16, res1.index);
        setMatrix(this.state.matrix, res2.num, res2.index);
      }
    } 
    
    return (
      <div 
        tabIndex="0"
        onKeyDown={this._onKeyDown} 
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}
      >
        <Board2048 
          matrix={this.state.matrix} 
          score={this.state.score} 
          full={this.state.full} 
          canMove={this.state.canMove}
          win2048={this.state.win2048}
          win4096={this.state.win4096}
          restartButton={
            <a 
              className="restart-button"
              onClick={this.restart}
            > 
              New Game
            </a>
          }
        />
      </div>
    );
  };
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));


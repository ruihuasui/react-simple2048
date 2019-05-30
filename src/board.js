import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {matrixAt} from './matrix.js';
import {Square} from './square.js'
import './index.css'

var display_ = 'none';
var marginLeft_number = (window.innerWidth <= 520) ? 
                        Math.floor((window.innerWidth - 275)/2) : 
                        Math.floor(window.innerWidth - 415)/2;
var marginLeft_ = parseInt(marginLeft_number) + 'px';

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
            {/* <a 
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
            </div> */}
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${"bottom"}`}>
                  💻 <strong>Computer Users</strong> can use key 
                    <strong> 'w,a,s,d' or 'arrow keys'</strong> to move the tiles.<br/>
                  📱 <strong>Mobile Users</strong> can <strong>swipe the screen</strong> to move the tiles.
                </Tooltip>
              }
            >
              <a className="howToPlay" >
                How to Play
              </a>
            </OverlayTrigger>
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
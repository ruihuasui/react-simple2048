import ReactDOM from 'react-dom';
import React from 'react'
import Game from './game.js'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router } from 'react-router-dom'

function RouterBar(props) {
  return (
    <Router >
      <div >
        <Navbar bg="light" variant="light" >
          <Navbar.Brand href="/react-simple2048/">
            <img
              className="logo"
              href="./images/logo.png"
            />
            {' '}Simple 2048
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="https://ruihuasui.github.io/react-gobang/">Gobang</Nav.Link>
            <Nav.Link href="/react-simple2048/">Simple 2048</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <Route exact path="/react-simple2048/" component={Game} />
      </div>
    </Router>
  )
}

export default function App() {
  return (
    <div>
      <RouterBar />
      <Game />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));



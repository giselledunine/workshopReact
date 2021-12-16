import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UpdateStudent from './components/UpdateStudent';
import AddStudent from './components/AddStudent';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar>
          <Navbar.Brand href="#home">DCPARIS</Navbar.Brand>
          <Nav className="nav">
            <Nav.Link href="#home" className="navlink">Home</Nav.Link>
            <Nav.Link href="#features" className="navlink">Features</Nav.Link>
            <Nav.Link href="#pricing" className="navlink">Pricing</Nav.Link>
          </Nav>
      </Navbar>   
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<UpdateStudent />} />
          <Route path="/add" element={<AddStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

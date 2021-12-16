import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UpdateStudent from './components/UpdateStudent';
import AddStudent from './components/AddStudent';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";



function App() {
  return (
    <div className="App">
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

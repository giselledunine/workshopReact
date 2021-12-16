import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UpdateStudent from './components/UpdateStudent';
import AddStudent from './components/AddStudent';
import {Routes, Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="" element={<Home></Home>} />
        <Route path="add" element={<AddStudent></AddStudent>} />
        <Route path="update" element={<UpdateStudent></UpdateStudent>} />
      </Routes>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Component/Common/Register';
import Login from './Component/Common/Login';
import Home from './Component/Common/Home';
import Add_question from './Component/Admin/Add_question';
import Quiz from './Component/Admin/Quiz';
import Navbar from './Component/Common/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/add_question' element={<Add_question/>}/>
        <Route exact path='/quiz' element={<Quiz/>}/>
      </Routes>
    </div>
  );
}

export default App;

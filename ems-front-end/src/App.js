import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import Pnf from './Pages/Pnf';
import Header from './Components/Header';
import Footer from './Components/Footer';



function App() {
  return (
    <>
     <header>
      <Header/>
     </header>
     
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile/:id' element={<Profile/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='*' element={<Pnf/>}></Route>
      </Routes>
      <footer>
        <Footer/> 
      </footer>
      
    </>
  );
}

export default App;


import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';


function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
        
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
   
   </BrowserRouter>
  
  );
}

export default App;

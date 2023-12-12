import Registers from './pages/Register';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';  
import Certi from './pages/Certi';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path='/register' element={<Registers/>} />
        <Route path='/dash/:id' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/certi/:id' element={<Certi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/get",{ withCredentials: true })
        .then(response => {
          if(response.data.user){
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
          }
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar'
import ProductList from './components/productList'
import { Box } from '@mui/system'
import {css} from '@emotion/react'
import { Snackbar, Alert } from '@mui/material'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Filterbar from './components/filterbar'
import ProductPage from './pages/product'
import Cart from './pages/cart'
import Boilerplate from './pages/boilerplate'
import ProductDetail from './pages/productDetail'
import CreateProduct from './pages/createProduct'
import EditProduct from './pages/editProduct'
import Login from './pages/login'
import Register from './pages/register'
import Orders from './pages/orders'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { close } from './features/snackbarSlice';

axios.defaults.baseURL = process.env.NODE_ENV==='production'?"https://dbms-project-server.onrender.com/api/v1":"http://localhost:3002/api/v1/";
// axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token')}`};

function App() {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const open = useSelector(state => state.snackbar.open);
  const message = useSelector(state => state.snackbar.message);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(close());
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Boilerplate />}>
        {/* <Route path="login" element={<Login />} /> */}
        <Route index element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/prod/:id" element={<ProductDetail />} />
        <Route path="/new" element={<CreateProduct />} />
        <Route path="/prod/:id/edit" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />
        {/* <Route element={<PrivateRoute />}>
        </Route> */}
        </Route>
      </Route>
    )
  )

  return (
    <>
    <CssBaseline />
    <RouterProvider router={router} />   
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
    {/* <Container css={css(classes.main)}>
      <Filterbar />
      <ProductList />
    </Container> */}
    {/* <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div> */}
    </>
  )
}

export default App

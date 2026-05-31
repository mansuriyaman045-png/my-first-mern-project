import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import AddProducts from './admin/AddProdcts'
import ProductList from './admin/ProductsList'
import EditProducts from './admin/EditProducts'
import ProductDetails from './pages/ProductDetails'
import Nav from './components/Nav'
import Cart from './pages/Cart'

function Layout (){
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
{
  element:<Layout/>,
  children:[
      { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  { path: "/admin/add", element: <AddProducts /> },

  { path: "/admin/products/edit/:id", element: <EditProducts /> },

  { path: "/admin/products", element: <ProductList /> },
  { path: "/products/:id", element: <ProductDetails /> }, 
  {path:"/cart" , element:<Cart/>}
  ]
}

])

function App() {
  return <RouterProvider router={router} />
}

export default App
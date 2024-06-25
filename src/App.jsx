import { useState } from 'react'
import './App.css'
import { Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import GiftsPack from './components/giftspack/GiftsPack';
import AllProducts from './components/allproducts/AllProducts';
import Root from './Root';
import Home from './Home';
import Error from './components/errorpage/Error';
import DetailsPage from './components/detailspage/DetailsPage';
import Beauty from './components/beauty/Beauty';
import { loader as homeLoader } from './components/detailspage/DetailsPage';
import ProfilePage from './components/profile/ProfilePage';
import Hair from './components/hair/Hair';
import Body from './components/body/Body';
import Makeup from './components/makeup/Makeup';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
        {path: "", element: <Home />},
        {path: "giftpacks", element: <GiftsPack />},
        { path: "allproducts", element: <AllProducts />},
        { path: "beauty", element: <Beauty/>},
        { path: "profile", element: <ProfilePage />},
        { path: "hair", element: <Hair />},
        { path: "body", element: <Body />},
        { path: "makeup", element: <Makeup />},
        { path: "/product/:id", element: <DetailsPage />, loader: homeLoader},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

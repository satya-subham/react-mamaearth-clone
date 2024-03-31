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

function App() {
  const [search, setSearch] = useState("")

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root search={search} setSearch={setSearch}/>,
      errorElement: <Error />,
      children: [
        {path: "", element: <Home search={search} setSearch={setSearch}/>},
        {path: "giftpacks", element: <GiftsPack search={search} setSearch={setSearch}/>},
        { path: "allproducts", element: <AllProducts search={search}/>},
        { path: "beauty", element: <Beauty/>},
        { path: "/product/:id", element: <DetailsPage />, loader: homeLoader}
      ]
    }
  ])

  return (
    <>
      {/* <Header search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Main search={search} setSearch={setSearch}/>}/>
        <Route path='/giftpacks' element={<GiftsPack search={search} setSearch={setSearch}/>}/>
        <Route path='/allproducts' element={<AllProducts search={search}/>}/>
      </Routes>
      <Footer /> */}

      <RouterProvider router={router} />
      
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react'
import './App.css'
import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

export const SearchContext = createContext('')

function App() {
  const [searchInput, setSearchInput] = useState('')



  console.log(searchInput, 'INPUT CAHNGED')
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App

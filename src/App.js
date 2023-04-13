import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'


function App() {
  const [searchInput, setSearchInput] = useState('')

  console.log(searchInput, 'INPUT CAHNGED')
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchInput={searchInput}/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App

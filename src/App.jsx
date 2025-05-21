// components

import './App.css'
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form/Form'
import Dashboard from './components/Dashboard'
import Login from './components/Login/Login'
import Register from './components/Login/Register'

function App() {

  return (
    <>
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/formulario' element={<Form/>}></Route>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
    </div>
    </>
  )
}

export default App

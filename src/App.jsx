// components

import './App.css'
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form/Form'

function App() {

  return (
    <>
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/formulario' element={<Form/>}></Route>
            <Route path='/' element={<Home/>}></Route>         
          </Routes>
        </BrowserRouter>
    </div>
    </>
  )
}

export default App

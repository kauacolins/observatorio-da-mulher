// components

import './App.css'
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import FormStep1 from './components/Form/FormStep1'
import FormStep2 from './components/Form/FormStep2'
import FormStep3 from './components/Form/FormStep3'
import FormStep4 from './components/Form/FormStep4'
import Form from './components/Form/Form'

// Hooks
import { useForm } from './hooks/useForm'


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

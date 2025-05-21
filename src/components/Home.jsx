import React from 'react'
import Navbar from './Navbar'
import './Home.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="container-main">
          <div className="text-main">
          <div className='column'></div>
          <h1 className='title'>
            Observatório da 
            <span>Mulher</span>
          </h1>
          <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae inventore pariatur qui earum numquam. Pariatur, accusantium molestias nemo illo nulla eligendi quae optio. Quo distinctio sint omnis, dolor corrupti quaerat?</p>
          
          <button className='btn-primary'>Ir para formulário</button>
          </div>
          <div className='ilustration'><img src="/ilustração.png" alt="" /></div>
        </div>
    </div>
  )
}

export default Home
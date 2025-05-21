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
          <p className='text'>O Observatório da Mulher 2025 é uma iniciativa que mapeia e analisa a situação das mulheres no Brasil, com foco em educação, saúde e violência. Nosso objetivo é fornecer dados claros e confiáveis para orientar políticas públicas e fortalecer o debate social.</p>
          
          <button className='btn-primary'>Ir para formulário</button>
          </div>
          <div className='ilustration'><img src="./ilustration.png" alt="" /></div>
        </div>
    </div>
  )
}

export default Home
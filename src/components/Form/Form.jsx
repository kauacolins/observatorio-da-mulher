import React from 'react'
import Navbar from '../Navbar'
import { useForm } from '../../hooks/useForm'
import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'
import FormStep3 from './FormStep3'
import FormStep4 from './FormStep4'



const Form = () => {

    const formComponents = [
        <FormStep1/>,
        <FormStep2/>,
        <FormStep3/>,
        <FormStep4/>,
    ]

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents)

  return (
    <>
        
        <div className='Form'>
            <Navbar></Navbar>
            <h1>Formulário</h1>
        </div>
        <div className="form-container">
        <p>etapas</p>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
            <div className="inputs-container">
                {currentComponent}
            </div>
            <div className="actions">
            {!isFirstStep && (
                <button type='button' onClick={() => changeStep(currentStep - 1)}>
                    <span>Voltar</span>
                </button>
            )}
            {!isLastStep ? (
                <button type='submit'>
                    <span>Avançar</span>
                </button>
            ) : (
                <button type='button'>
                    <span>Enviar</span>
                </button>
            )}
            </div>
        </form>
        </div>
    </>
  )
}

export default Form
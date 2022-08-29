import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import './styles.css'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE: 'delete-digit',
  EVALUATE: 'evaluate',
}


function reducer (state, {type, payload}) {
  
  switch(type){

    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
  }
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});



  return (
    <div className="calculator-grid">
      <div className='output' >
        <div className='previous-operand' >{previousOperand}{operation}</div>
        <div className='current-operand' >{currentOperand}</div>
      </div>
      <button className='span-two' >AC</button>
      <button>DEL</button>
      <button>÷</button>
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <button>*</button>
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <button>+</button>
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <button>-</button>
      <button>.</button>
      <DigitButton dispatch={dispatch} digit='0' />
      <button className='span-two' >=</button>

    </div>
  );
}

export default App;

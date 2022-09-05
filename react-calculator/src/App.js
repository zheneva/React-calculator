import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './styles.css'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE: 'delete-digit',
  EVALUATE: 'evaluate',
}


function reducer(state, { type, payload }) {

  switch (type) {

    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: `${state.currentOperand}`,
          currentOperand: null,
        }
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      }

    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        };
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    case ACTIONS.EVALUATE:
      if (state.operation === null || state.currentOperand == null || state.previousOperand === null) return state;
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      }
  }
}


function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }
  return computation.toString();
}


const INTEGER_FORMATOR = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});


function formatOperand(operand){
  if(operand == null) return ;
  console.log('operand:', operand, typeof operand);
  const [integer, decimal] = operand.split('.');

  if (decimal == null) return INTEGER_FORMATOR.format(integer); 
  return `${INTEGER_FORMATOR.format(integer)}.${decimal}`
}




function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});


  return (
    <div className="calculator-grid">
      <div className='output' >
        <div className='previous-operand' >{formatOperand(previousOperand)}{operation} </div>
        <div className='current-operand' >{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className='span-two' >AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })} >DEL</button>
      <OperationButton dispatch={dispatch} operation='÷' />
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <OperationButton dispatch={dispatch} operation='*' />
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <OperationButton dispatch={dispatch} operation='+' />
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <OperationButton dispatch={dispatch} operation='-' />
      <DigitButton dispatch={dispatch} digit='.' />
      <DigitButton dispatch={dispatch} digit='0' />
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className='span-two' >=</button>

    </div>
  );
}

export default App;

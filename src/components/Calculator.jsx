import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = (char) => {
    return ['+', '-', '*', '/'].includes(char);
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setDisplay(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      if (display === '0') {
        setDisplay(num);
        setFormula(num);
      } else {
        setDisplay(display + num);
        setFormula(formula + num);
      }
    }
  };

  const handleOperator = (operator) => {
    setEvaluated(false);
    if (evaluated) {
      setFormula(display + operator);
    } else {
      if (isOperator(formula.slice(-1))) {
        if (operator === '-' && formula.slice(-1) !== '-') {
          setFormula(formula + operator);
        } else {
          if (formula.slice(-2, -1) === '-') {
            setFormula(formula.slice(0, -2) + operator);
          } else {
            setFormula(formula.slice(0, -1) + operator);
          }
        }
      } else {
        setFormula(formula + operator);
      }
    }
    setDisplay(operator);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setFormula('0.');
      setEvaluated(false);
    } else {
      if (!display.includes('.')) {
        setDisplay(display + '.');
        setFormula(formula + '.');
      }
    }
  };

  const handleEqual = () => {
    if (!evaluated) {
      let result;
      try {
        result = Function('"use strict";return (' + formula + ')')();
        result = Number(Math.round(result + 'e4') + 'e-4');
        setDisplay(String(result));
        setFormula(String(result));
        setEvaluated(true);
      } catch (error) {
        setDisplay('Error');
        setFormula('');
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  return (
    <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-xl">
      <div className="bg-gray-700 p-4 mb-4 rounded">
        <div className="text-gray-400 text-sm h-6 text-right overflow-hidden">
          {formula || '0'}
        </div>
        <div id="display" className="text-white text-2xl text-right overflow-hidden">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button 
          id="clear" 
          onClick={handleClear} 
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded"
        >
          AC
        </button>
        <button 
          id="divide" 
          onClick={() => handleOperator('/')} 
          className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
        >
          /
        </button>
        <button 
          id="multiply" 
          onClick={() => handleOperator('*')} 
          className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
        >
          ×
        </button>
        
        <button 
          id="seven" 
          onClick={() => handleNumber('7')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          7
        </button>
        <button 
          id="eight" 
          onClick={() => handleNumber('8')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          8
        </button>
        <button 
          id="nine" 
          onClick={() => handleNumber('9')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          9
        </button>
        <button 
          id="subtract" 
          onClick={() => handleOperator('-')} 
          className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
        >
          -
        </button>
        
        <button 
          id="four" 
          onClick={() => handleNumber('4')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          4
        </button>
        <button 
          id="five" 
          onClick={() => handleNumber('5')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          5
        </button>
        <button 
          id="six" 
          onClick={() => handleNumber('6')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          6
        </button>
        <button 
          id="add" 
          onClick={() => handleOperator('+')} 
          className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
        >
          +
        </button>
        
        <button 
          id="one" 
          onClick={() => handleNumber('1')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          1
        </button>
        <button 
          id="two" 
          onClick={() => handleNumber('2')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          2
        </button>
        <button 
          id="three" 
          onClick={() => handleNumber('3')} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          3
        </button>
        <button 
          id="equals" 
          onClick={handleEqual} 
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded row-span-2"
        >
          =
        </button>
        
        <button 
          id="zero" 
          onClick={() => handleNumber('0')} 
          className="col-span-2 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          0
        </button>
        <button 
          id="decimal" 
          onClick={handleDecimal} 
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
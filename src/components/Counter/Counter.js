import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h1 className="counter-value">Counter: {count}</h1>
      <div className="button-group">
        <button 
          className="counter-button" 
          onClick={decrement}
          aria-label="Уменьшить счетчик"
        >
          Уменьшить
        </button>
        <button 
          className="counter-button" 
          onClick={increment}
          aria-label="Увеличить счетчик"
        >
          Увеличить
        </button>
      </div>
    </div>
  );
}

export default Counter;
import { useState } from 'react';
import './Home.css';

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [increase, setIncrease] = useState(1);

  function handleClick() {
    setCounter(counter + 1);
  }
  function handleClickWithValue(value) {
    setCounter(counter + parseInt(value));
  }

  return (
    <div className="home page">
      <h1>Counter</h1>
      <h1>{ counter }</h1>
      <button onClick={handleClick}>Click me!</button>
      <div className="button-row">
        <input placeholder="Set increase value" onChange={(e) => setIncrease(e.target.value)} />
        <button onClick={() => handleClickWithValue(increase)}>Click to increase by {increase}</button>
      </div>
    </div>
  );
}

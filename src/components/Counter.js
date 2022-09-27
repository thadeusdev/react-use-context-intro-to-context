import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import Likes from "./Likes";

function Counter({ paused, togglePaused }) {
  const [count, setCount] = useState(0);
  const [likedNumbers, setLikedNumbers] = useState({});

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);

      return function cleanup() {
        clearInterval(interval);
      };
    }
  }, [paused]);

  function increment() {
    setCount((count) => count + 1);
  }

  function decrement() {
    setCount((count) => count - 1);
  }

  function like() {
    setLikedNumbers((likedNumbers) => {
      const likes = (likedNumbers[count] || 0) + 1;
      return {
        ...likedNumbers,
        [count]: likes,
      };
    });
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <Controls
        increment={increment}
        decrement={decrement}
        like={like}
        paused={paused}
        togglePaused={togglePaused}
      />
      <Likes likedNumbers={likedNumbers} />
    </div>
  );
}

export default Counter;

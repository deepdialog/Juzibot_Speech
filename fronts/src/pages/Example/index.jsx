import React, { useState } from 'react';

import Welcome from "@/components/RichEditor"


function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

      <Welcome />

    </div>
  );
}


export default Example
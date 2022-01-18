import { useState } from 'react';

function useDeepState(initialize) {
  const [state, setState] = useState(initialize);

  const objectSetState = (newValue) => {
    setState(Object.assign({}, state, newValue));
  };
  return [state, objectSetState];
}

export default useDeepState;

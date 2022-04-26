import { useState } from "react";

const initialState = {
  keys: [],
}

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const importKeys = (payload) => {
    setState({
      ...state,
      keys: payload
    })
  }

  const updateKey = (payload) => {
    let newKeys = state.keys;
    let i = newKeys.findIndex(i => i.key == payload.key)
    newKeys[i] = payload;
    
    setState({
      ...state,
      keys: newKeys
    })
  }

  return {
    state,
    importKeys,
    updateKey
  }
}

export default useInitialState;
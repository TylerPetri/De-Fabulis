import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  data: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.data };
    default:
      console.log(`Invalid action type: ${action.type}`);
      return state;
  }
};

const StoreContext = createContext();

const useStoreContext = function () {
  return useContext(StoreContext);
};

const StoreProvider = function (props) {
  const [state, dispatch] = useReducer(dataReducer, initialData);
  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

export { StoreProvider, useStoreContext };

import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  data: [],
  currentStory: {
    settings: [
      { option: 'Font', color: 'white', dropdown: false },
      {
        option: 'Text-background',
        color: 'rgb(121, 80, 28)',
        dropdown: false,
      },
      {
        option: 'Background',
        color: 'rgb(0, 0, 0, 0.4)',
        dropdown: false,
      },
    ],
  },
  openEdit: false,
  openPreview: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.data };
    case 'SET_STORY_SETTINGS':
      return { ...state, ...action.data };
    case 'OPEN_EDIT':
      return { ...state, openEdit: true };
    case 'CLOSE_EDIT':
      return { ...state, openEdit: false };
    case 'OPEN_PREVIEW':
      return { ...state, openPreview: true };
    case 'CLOSE_PREVIEW':
      return { ...state, openPreview: false };
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

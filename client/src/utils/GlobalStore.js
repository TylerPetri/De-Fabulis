import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  windowSize: {
    width: undefined,
    height: undefined,
  },
  data: [],
  currentStorySettings: [
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
  cover: '',
  body: '',
  currentTags: '',

  username: '',
  createdAt: 0,
  title: '',
  storySettings: {
    font: '',
    textBackground: '',
    background: '',
  },
  coverSettings: {
    font: '',
    background: '',
  },

  openEdit: false,
  openPreview: false,
  openStory: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ONE':
      return { ...state, ...action.data };
    case 'SET_WINDOW_SIZE':
      return { ...state, ...action.data };
    case 'SET_CURRENT_STORY':
      return { ...state, ...action.data };
    case 'SET_STORY_SETTINGS':
      return { ...state, ...action.data };
    case 'CLEAR_COVER':
      return { ...state, currentCover: '' };
    case 'CLEAR_STORY':
      return { ...state, currentBody: '' };
    case 'CLEAR_CURRENT_STORY':
      return {
        ...state,
        username: '',
        createdAt: 0,
        tags: '',
        title: '',
        cover: '',
        story: '',
        storySettings: {
          font: '',
          textBackground: '',
          background: '',
        },
        coverSettings: {
          font: '',
          background: '',
        },
      };
    case 'OPEN_EDIT':
      return { ...state, openEdit: true };
    case 'CLOSE_EDIT':
      return { ...state, openEdit: false };
    case 'OPEN_PREVIEW':
      return { ...state, openPreview: true };
    case 'CLOSE_PREVIEW':
      return { ...state, openPreview: false };
    case 'OPEN_STORY':
      return { ...state, openStory: true };
    case 'CLOSE_STORY':
      return { ...state, openStory: false };
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

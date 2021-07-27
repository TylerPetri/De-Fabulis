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
  imageCover: '',
  textCover: '',
  story: '',
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
    textBackground: '',
  },
  storyFileSelected: false,
  storyFile: '',
  imgFileSelected: false,
  imgFile: '',
  textCoverFileSelected: false,
  textCoverFile: '',
  uploadCoverFileX: false,
  openCoverEdit: false,
  openStoryEdit: false,
  openPreview: false,
  openStory: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.data };
    case 'CLEAR_CURRENT_STORY':
      return {
        ...state,
        username: '',
        createdAt: 0,
        tags: '',
        title: '',
        textCover: '',
        imageCover: '',
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
    case 'X_ON':
      return { ...state, uploadCoverFileX: true };
    case 'XS_ON':
      return { ...state, uploadStoryFileX: true };
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

import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  windowSize: {
    width: undefined,
    height: undefined,
  },
  data: [],
  filteredList: [],
  currentStorySettings: [
    { option: 'Font', color: 'white', dropdown: false },
    {
      option: 'Text-background',
      color: 'rgb(156,39,176)',
      dropdown: false,
    },
    {
      option: 'Background',
      color: 'rgb(0, 0, 0, 0.6)',
      dropdown: false,
    },
  ],
  currentCoverSettings: [
    { option: 'Font', color: 'rgb(0,230,118)', dropdown: false },
    {
      option: 'Cover-Background',
      color: 'black',
      dropdown: false,
    },
    {
      option: 'Title-Font',
      color: 'black',
      dropdown: false,
    },
    {
      option: 'Title-Background',
      color: 'grey',
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
  openCoverColors: false,
  openCoverPreview: false,
  openStoryEdit: false,
  openStoryPreview: false,
  openStoryColors: false,
  openStory: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.data };
    case 'RESET_DEFAULT_SETTINGS':
      return {
        ...state,
        currentStorySettings: [
          { option: 'Font', color: 'white', dropdown: false },
          {
            option: 'Text-background',
            color: 'rgb(121, 80, 28)',
            dropdown: false,
          },
          {
            option: 'Background',
            color: 'rgb(0, 0, 0, 0.6)',
            dropdown: false,
          },
        ],
        currentCoverSettings: [
          { option: 'Font', color: 'green', dropdown: false },
          {
            option: 'Cover-Background',
            color: 'black',
            dropdown: false,
          },
          {
            option: 'Title-Font',
            color: 'black',
            dropdown: false,
          },
          {
            option: 'Title-Background',
            color: 'grey',
            dropdown: false,
          },
        ],
      };
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
    case 'CLEAR_SELECTED_FILES':
      return {
        ...state,
        storyFileSelected: false,
        imgFileSelected: false,
        textCoverFileSelected: false,
        uploadCoverFileX: false,
      };
    case 'X_ON':
      return { ...state, uploadCoverFileX: true };
    case 'XS_ON':
      return { ...state, uploadStoryFileX: true };
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

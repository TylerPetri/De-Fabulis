import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  scrollHeight: 0,
  userLoggedIn: false,
  user: '',
  data: [],
  filteredList: [],
  colors: [
    'rgb(244,67,54)',
    'rgb(255,152,0)',
    'rgb(255, 235, 59)',
    'rgb(0,230,118)',
    'rgb(0,176,255)',
    'rgb(41,121,255)',
    'rgb(156,39,176)',
    'rgb(216, 22, 138)',
    'rgb(121, 80, 28)',
    'black',
    'rgb(128,128,128)',
    'rgb(255,255,255)',
  ],
  currentStorySettings: [
    { option: 'Font', color: 'rgb(255,255,255)', dropdown: false },
    {
      option: 'Text-background',
      color: 'rgb(0,176,255)',
      dropdown: false,
    },
    {
      option: 'Background',
      color: 'rgb(128, 128, 128, 0.6)',
      dropdown: false,
    },
  ],
  currentCoverSettings: [
    { option: 'Font', color: 'black', dropdown: false },
    {
      option: 'Cover-Background',
      color: 'rgb(0,230,118)',
      dropdown: false,
    },
    {
      option: 'Title-Font',
      color: 'rgb(216, 22, 138)',
      dropdown: false,
    },
    {
      option: 'Title-Background',
      color: 'rgb(255,152,0)',
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
  submitted: false,
  mainSidenav: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.data };
    case 'RESET_DEFAULT_SETTINGS':
      return {
        ...state,
        currentStorySettings: [
          { option: 'Font', color: 'rgb(255,255,255)', dropdown: false },
          {
            option: 'Text-background',
            color: 'rgb(0,176,255)',
            dropdown: false,
          },
          {
            option: 'Background',
            color: 'rgb(128, 128, 128, 0.6)',
            dropdown: false,
          },
        ],
        currentCoverSettings: [
          { option: 'Font', color: 'black', dropdown: false },
          {
            option: 'Cover-Background',
            color: 'rgb(0,230,118)',
            dropdown: false,
          },
          {
            option: 'Title-Font',
            color: 'rgb(216, 22, 138)',
            dropdown: false,
          },
          {
            option: 'Title-Background',
            color: 'rgb(255,152,0)',
            dropdown: false,
          },
        ],
      };
    case 'CLEAR_CURRENT_STORY':
      return {
        ...state,
        username: '',
        createdAt: 0,
        currentTags: '',
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

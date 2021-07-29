import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import CoverContainer from '../../Components/Compose-Cover-Container/composeCoverCont';
import StoryContainer from '../../Components/Compose-Story-Container/composeStoryContainer';
import AddTags from '../../Components/Compose-Tags/composeTags';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';

import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [{ currentStorySettings, currentCoverSettings }, dispatch] =
    useStoreContext();
  const [storySettings, setStorySettings] = useState(currentStorySettings);
  const [coverSettings, setCoverSettings] = useState(currentCoverSettings);

  const textFileInput = useRef();
  const imgFileInput = useRef();
  const textFileInputCover = useRef();

  useEffect(() => {
    textFileInput.current.value = '';
    textFileInputCover.current.value = '';
    imgFileInput.current.value = '';
    dispatch({ type: 'CLEAR_CURRENT_STORY' });
  }, []);

  //--------------//
  //  File upload //
  //--------------//
  let fileReader;

  function handleFileRead() {
    const content = fileReader.result;
    dispatch({
      type: 'SET',
      data: { story: content, storyFileSelected: true },
    });
  }

  function handleImageFileRead() {
    const content = fileReader.result;
    dispatch({
      type: 'SET',
      data: { imageCover: content, imgFileSelected: true },
    });
  }
  function handleCoverFileRead() {
    const content = fileReader.result;
    dispatch({
      type: 'SET',
      data: { textCover: content, textCoverFileSelected: true },
    });
  }

  function handleFileChosen(e, file, id) {
    fileReader = new FileReader();
    if (e.target.value) {
      if (id === 'textFileStory') {
        fileReader.onloadend = handleFileRead;
        dispatch({
          type: 'SET',
          data: { storyFile: e.target.value },
        });
        setTimeout(() => dispatch({ type: 'XS_ON' }), 500);
      }
      if (id === 'imgFile') {
        fileReader.onloadend = handleImageFileRead;
        dispatch({
          type: 'SET',
          // data: { imgFile: e.target.value },
        });
        setTimeout(() => dispatch({ type: 'X_ON' }), 500);
      }
      if (id === 'textFile') {
        fileReader.onloadend = handleCoverFileRead;
        dispatch({
          type: 'SET',
          data: { textCoverFile: e.target.value },
        });
        setTimeout(() => dispatch({ type: 'X_ON' }), 500);
      }
      fileReader.readAsText(file);
    }
  }

  function clearFileChosen(event) {
    const id = event.target.className.baseVal;
    if (id === 'IoClose-story') {
      dispatch({
        type: 'SET',
        data: {
          storyFileSelected: false,
        },
      });
      setTimeout(() => {
        dispatch({
          type: 'SET',
          data: { story: '', storyFile: '', uploadStoryFileX: false },
        });
        textFileInput.current.value = '';
      }, 550);
    } else {
      dispatch({
        type: 'SET',
        data: {
          textCoverFileSelected: false,
          imgFileSelected: false,
          uploadCoverFileX: false,
        },
      });
      setTimeout(() => {
        dispatch({
          type: 'SET',
          data: {
            textCover: '',
            textCoverFile: '',
            imageCover: '',
            imgFile: '',
          },
        });
        textFileInputCover.current.value = '';
        imgFileInput.current.value = '';
      }, 650);
    }
  }
  //------------//

  return (
    <>
      <Navbar />
      <div className='compose-wrapper'>
        <div className='compose-cover-story-container'>
          <StoryContainer
            settings={storySettings}
            setSettings={setStorySettings}
            textFileInput={textFileInput}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
          <CoverContainer
            storySettings={storySettings}
            setStorySettings={setStorySettings}
            coverSettings={coverSettings}
            setCoverSettings={setCoverSettings}
            imgFileInput={imgFileInput}
            textFileInputCover={textFileInputCover}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
        </div>
        <div>
          <AddTags />
        </div>
        <UploadButtons />
      </div>
    </>
  );
}

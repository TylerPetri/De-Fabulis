import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import CoverContainer from '../../Components/Compose-Cover-Container/composeCoverCont';
import StoryContainer from '../../Components/Compose-Story-Container/composeStoryContainer';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';

import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [{ currentStory, currentStorySettings, storyFileSelected }, dispatch] =
    useStoreContext();
  const [settings, setSettings] = useState(currentStorySettings);
  const [temp, setTemp] = useState([currentStory]);

  const textFileInput = useRef();
  const imgFileInput = useRef();
  const textFileInputCover = useRef();

  useEffect(() => {
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
      data: { image: content, imgFileSelected: true },
    });
  }
  function handleCoverFileRead() {
    const content = fileReader.result;
    dispatch({
      type: 'SET',
      data: { cover: content, textCoverFileSelected: true },
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
          data: { imgFile: e.target.value },
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
          data: { cover: '', textCoverFile: '', img: '', imgFile: '' },
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
            settings={settings}
            setSettings={setSettings}
            textFileInput={textFileInput}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
          <CoverContainer
            settings={settings}
            setSettings={setSettings}
            imgFileInput={imgFileInput}
            textFileInputCover={textFileInputCover}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
        </div>

        {/* <UploadButtons temp={temp} setTemp={setTemp} /> */}
      </div>
    </>
  );
}

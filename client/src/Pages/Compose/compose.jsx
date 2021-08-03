import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';
import CoverContainer from '../../Components/Compose-Cover-Container/composeCoverCont';
import StoryContainer from '../../Components/Compose-Story-Container/composeStoryContainer';
import AddTags from '../../Components/Compose-Tags/composeTags';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';
import fetchJSON from '../../utils/API';

import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [
    { currentStorySettings, currentCoverSettings, userLoggedIn, scrollHeight },
    dispatch,
  ] = useStoreContext();
  const [storySettings, setStorySettings] = useState(currentStorySettings);
  const [coverSettings, setCoverSettings] = useState(currentCoverSettings);
  const [mustBeLoggedIn, setMustBeLoggedIn] = useState(false);

  const textFileInput = useRef();
  // const imgFileInput = useRef();
  const textFileInputCover = useRef();
  const composeWrapper = useRef();

  useEffect(() => {
    async function handleAuth() {
      let username = sessionStorage.libraryOfStories_user;
      let session = sessionStorage.libraryOfStories_session;
      if (username) {
        await fetchJSON('/api/authentication', 'POST', {
          username: username,
          session: session,
          type: 'checkAuth',
        });
        const res = await fetchJSON(`/api/authentication/${username}`);
        if (res.message === true) {
          dispatch({
            type: 'SET',
            data: { userLoggedIn: true, user: username },
          });
        } else {
          setMustBeLoggedIn(true);
        }
      } else {
        setMustBeLoggedIn(true);
      }
    }
    handleAuth();
    textFileInput.current.value = '';
    textFileInputCover.current.value = '';
    // imgFileInput.current.value = '';
    dispatch({ type: 'RESET_DEFAULT_SETTINGS' });
    dispatch({ type: 'CLEAR_CURRENT_STORY' });
  }, [userLoggedIn]);

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
        // imgFileInput.current.value = '';
      }, 650);
    }
  }
  //------------//

  return (
    <>
      <Navbar />
      <div className='compose-wrapper' ref={composeWrapper}>
        <div
          className='must-be-logged-in'
          style={{
            minHeight: scrollHeight,
            zIndex: mustBeLoggedIn ? '10' : '-1',
            opacity: mustBeLoggedIn ? '1' : '0',
          }}
        >
          <h1>Must be logged in</h1>
        </div>
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
            // imgFileInput={imgFileInput}
            textFileInputCover={textFileInputCover}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
        </div>
        <div>
          <AddTags />
        </div>
        <UploadButtons
          storySettings={storySettings}
          coverSettings={coverSettings}
          textFileInput={textFileInput}
          textFileInputCover={textFileInputCover}
        />
      </div>
    </>
  );
}

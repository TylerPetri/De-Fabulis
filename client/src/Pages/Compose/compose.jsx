import React, { useState, useRef, useEffect } from 'react';
import CoverContainer from '../../Components/Compose-Cover-Container/composeCoverCont';
import StoryContainer from '../../Components/Compose-Story-Container/composeStoryContainer';
import AddTags from '../../Components/Compose-Tags/composeTags';
import UploadButtons from '../../Components/Buttons/publishButton';

import { handleAuth } from '../../utils/HandleAuth';
import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [
    {
      currentStorySettings,
      currentCoverSettings,
      userLoggedIn,
      mustBeLoggedIn,
      scrollHeight,
    },
    dispatch,
  ] = useStoreContext();
  const [storySettings, setStorySettings] = useState(currentStorySettings);
  const [coverSettings, setCoverSettings] = useState(currentCoverSettings);
  const [txtFileAlert, setTxtFileAlert] = useState(false);
  const [txtFileStoryAlert, setTxtFileStoryAlert] = useState(false);

  const textFileInput = useRef();
  const textFileInputCover = useRef();

  useEffect(() => {
    async function authentication() {
      let username = sessionStorage.libraryOfStories_user;
      const res = await handleAuth();
      if (res.userLoggedIn === false && res.user === '') {
        dispatch({
          type: 'SET',
          data: { userLoggedIn: false, user: '' },
        });
      } else if (res.userLoggedIn === true && res.user === username) {
        dispatch({
          type: 'SET',
          data: { userLoggedIn: true, user: username },
        });
      } else if (res.mustBeLoggedIn === true) {
        dispatch({
          type: 'SET',
          data: { mustBeLoggedIn: true },
        });
      } else if (res === 'Authentication failed') {
        dispatch({
          type: 'SET',
          data: { mustBeLoggedIn: true },
        });
      } else {
        return 'Authentication failed';
      }
    }
    authentication();
    textFileInput.current.value = '';
    textFileInputCover.current.value = '';
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
      if (e.target.value.substring(e.target.value.length - 4) === '.txt') {
        if (id === 'textFileStory') {
          fileReader.onloadend = handleFileRead;
          dispatch({
            type: 'SET',
            data: { storyFile: e.target.value },
          });
          setTimeout(() => dispatch({ type: 'XS_ON' }), 500);
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
      } else {
        if (id === 'textFileStory') {
          setTxtFileStoryAlert(true);
          setTimeout(() => setTxtFileStoryAlert(false), 3000);
        }
        if (id === 'textFile') {
          setTxtFileAlert(true);
          setTimeout(() => setTxtFileAlert(false), 3000);
        }
      }
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
      }, 650);
    }
  }
  //------------//

  return (
    <>
      <div className='compose-wrapper'>
        <div
          className='must-be-logged-in'
          style={{
            minHeight: scrollHeight + 100,
            height: window.innerHeight,
            zIndex: mustBeLoggedIn ? '10' : '-1',
            opacity: mustBeLoggedIn ? '1' : '0',
          }}
        >
          <h1>Must be logged in</h1>
        </div>
        <div className='compose-cover-story-container'>
          <StoryContainer
            alert={txtFileStoryAlert}
            settings={storySettings}
            setSettings={setStorySettings}
            textFileInput={textFileInput}
            handleFileChosen={handleFileChosen}
            clearFileChosen={clearFileChosen}
          />
          <CoverContainer
            alert={txtFileAlert}
            storySettings={storySettings}
            setStorySettings={setStorySettings}
            coverSettings={coverSettings}
            setCoverSettings={setCoverSettings}
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

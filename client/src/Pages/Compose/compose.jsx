import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import EditStory from '../../Components/Compose-Edit-Story/editStory';
import FileSelectionButtons from '../../Components/File-selection-buttons/fileSelectionButtons';
import AddTitle from '../../Components/Compose-Title/addTitle';
import AddTags from '../../Components/Compose-Tags/composeTags';
import AddCover from '../../Components/Compose-Cover/composeCover';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';
import StoryPreview from '../../Components/Preview-story/previewStory';
import ColorOptions from '../../Components/Compose-Color-Options/colorOptions';
import fetchJSON from '../../utils/API';

import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [
    {
      currentStory,
      cover,
      story,
      username,
      title,
      image,
      coverFileSelected,
      currentStorySettings,
    },
    dispatch,
  ] = useStoreContext();
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
    dispatch({ type: 'SET_ONE', data: { story: content } });
    dispatch({ type: 'SET_ONE', data: { storyFileSelected: true } });
  }

  function handleImageFileRead() {
    const content = fileReader.result;
    dispatch({ type: 'SET_ONE', data: { image: content } });
    dispatch({ type: 'SET_ONE', data: { imgFileSelected: true } });
  }
  function handleCoverFileRead() {
    const content = fileReader.result;
    dispatch({ type: 'SET_ONE', data: { cover: content } });
    dispatch({ type: 'SET_ONE', data: { coverFileSelected: true } });
  }

  function handleFileChosen(e, file, id) {
    fileReader = new FileReader();
    if (e.target.value) {
      if (id === 'textFileStory') fileReader.onloadend = handleFileRead;
      if (id === 'imgFile') fileReader.onloadend = handleImageFileRead;
      if (id === 'textFile') fileReader.onloadend = handleCoverFileRead;
      fileReader.readAsText(file);
    }
  }

  function clearFileChosen(event) {
    const id = event.target.parentNode.firstChild.id;
    if (id === 'textFileStory') {
      dispatch({ type: 'SET_ONE', data: { story: '' } });
      dispatch({ type: 'SET_ONE', data: { storyFileSelected: false } });

      textFileInput.current.value = '';
    } else if (id === 'imgFile') {
      dispatch({ type: 'SET_ONE', data: { image: '' } });
      dispatch({ type: 'SET_ONE', data: { imgFileSelected: false } });

      imgFileInput.current.value = '';
    } else if (id === 'textFile') {
      dispatch({ type: 'SET_ONE', data: { cover: '' } });
      dispatch({ type: 'SET_ONE', data: { coverFileSelected: false } });

      textFileInputCover.current.value = '';
    }
  }
  //------------//

  return (
    <>
      <Navbar />
      <div className='compose-wrapper'>
        <FileSelectionButtons
          textFileInput={textFileInput}
          imgFileInput={imgFileInput}
          handleFileChosen={handleFileChosen}
          clearFileChosen={clearFileChosen}
        />
        <AddTitle temp={temp} setTemp={setTemp} dispatch={dispatch} />
        <AddTags temp={temp} setTemp={setTemp} />
        <AddCover
          cover={cover}
          textFileInput={textFileInputCover}
          handleFileChosen={handleFileChosen}
          coverFileSelected={coverFileSelected}
          dispatch={dispatch}
        />
        <UploadButtons temp={temp} setTemp={setTemp} />
      </div>
      <StoryPreview username={username} title={title} story={story} />
      <EditStory settings={settings} setSettings={setSettings} />
    </>
  );
}

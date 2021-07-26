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
  const [{ currentStory, currentStorySettings }, dispatch] = useStoreContext();
  const [settings, setSettings] = useState(currentStorySettings);
  const [temp, setTemp] = useState([currentStory]);

  const textFileInput = useRef();
  const imgFileInput = useRef();
  const textFileInputCover = useRef();

  useEffect(() => {
    dispatch({ type: 'CLEAR_CURRENT_STORY' });
  }, []);

  function handleTempDispatch() {
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: temp[0] } });
  }

  //--------------//
  //  File upload //
  //--------------//
  let fileReader;

  function handleFileRead() {
    const content = fileReader.result;
    setTemp([...temp, (temp[0].story = content)]);
    handleTempDispatch();
  }

  function handleCoverFileRead() {
    const content = fileReader.result;
    setTemp([...temp, (temp[0].cover = content)]);
    handleTempDispatch();
  }

  function handleFileChosen(file, id) {
    fileReader = new FileReader();
    if (id === 'textFileStory') fileReader.onloadend = handleFileRead;
    if (id === 'textFile') fileReader.onloadend = handleCoverFileRead;
    fileReader.readAsText(file);
  }
  //------------//

  function submitForm() {
    handleTempDispatch();
    console.log(currentStory);
  }

  return (
    <>
      <Navbar />
      <div className='compose-wrapper'>
        <FileSelectionButtons
          textFileInput={textFileInput}
          imgFileInput={imgFileInput}
          handleFileChosen={handleFileChosen}
        />
        <AddTitle temp={temp} setTemp={setTemp} dispatch={dispatch} />
        <AddTags
          temp={temp}
          setTemp={setTemp}
          handleTempDispatch={handleTempDispatch}
        />
        <AddCover
          textFileInput={textFileInputCover}
          handleFileChosen={handleFileChosen}
        />
        <UploadButtons temp={temp} setTemp={setTemp} submitForm={submitForm} />
      </div>
      <StoryPreview />
      <EditStory settings={settings} setSettings={setSettings} />
    </>
  );
}

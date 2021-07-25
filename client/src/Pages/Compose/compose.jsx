import React, { useState, useRef } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import EditStory from '../../Components/Compose-Edit-Story/editStory';
import FileSelectionButtons from '../../Components/File-selection-buttons/fileSelectionButtons';
import AddTitle from '../../Components/Compose-Title/addTitle';
import AddAuthor from '../../Components/Compose-Author/composeAuthor';
import AddTags from '../../Components/Compose-Tags/composeTags';
import AddCover from '../../Components/Compose-Cover/composeCover';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';
import StoryPreview from '../../Components/Preview-story/previewStory';
import fetchJSON from '../../utils/API';

import { useStoreContext } from '../../utils/GlobalStore';

import './compose.css';

export default function Compose() {
  const [{ currentStory }, dispatch] = useStoreContext();
  const [temp, setTemp] = useState([currentStory]);

  const textFileInput = useRef();
  const imgFileInput = useRef();
  const textFileInputCover = useRef();

  let fileReader;

  function handleFileRead() {
    const content = fileReader.result;
    setTemp([...temp, (temp[0].story = content)]);
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: temp[0] } });
  }

  function handleCoverFileRead() {
    const content = fileReader.result;
    setTemp([...temp, (temp[0].cover = content)]);
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: temp[0] } });
  }

  function handleFileChosen(file, id) {
    fileReader = new FileReader();
    if (id === 'textFileStory') fileReader.onloadend = handleFileRead;
    if (id === 'textFile') fileReader.onloadend = handleCoverFileRead;
    fileReader.readAsText(file);
  }

  function updateCurrentStory() {
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: temp[0] } });
  }

  function submitForm() {
    dispatch({ type: 'SET_CURRENT_STORY', data: { currentStory: temp[0] } });
    console.log(currentStory);
  }

  function logs() {
    console.log(temp, currentStory);
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
        <button onClick={logs}>logs</button>
        <AddTitle
          temp={temp}
          setTemp={setTemp}
          updateCurrentStory={updateCurrentStory}
        />
        <AddAuthor
          temp={temp}
          setTemp={setTemp}
          updateCurrentStory={updateCurrentStory}
        />
        <AddTags
          temp={temp}
          setTemp={setTemp}
          updateCurrentStory={updateCurrentStory}
        />
        <AddCover
          textFileInput={textFileInputCover}
          handleFileChosen={handleFileChosen}
        />
        <UploadButtons submitForm={submitForm} />
      </div>
      <StoryPreview />
      <EditStory />
    </>
  );
}

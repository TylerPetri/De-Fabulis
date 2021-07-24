import React from 'react';
import Navbar from '../../Components/Navbar/navbar';
import TextArea from '../../Components/Compose-Textarea/textarea';
import FileSelectionButtons from '../../Components/File-selection-buttons/fileSelectionButtons';
import AddAuthor from '../../Components/Compose-Author/composeAuthor';
import AddTags from '../../Components/Compose-Tags/composeTags';
import AddCover from '../../Components/Compose-Cover/composeCover';
import UploadButtons from '../../Components/UploadButtons/uploadButtons';
import StoryPreview from '../../Components/Preview-story/previewStory';
import fetchJSON from '../../utils/API';

import './compose.css';

export default function Compose() {
  // const username = 'test';
  // const image = '';

  async function submitForm() {
    // const data = {
    //   username: username,
    //   stody: composeArea.current.value,
    //   // image: image,
    // };
    // await fetchJSON('/api/stories', 'post', data);
  }

  return (
    <>
      <Navbar />
      <div
        className='compose-wrapper'
        // style={{ zIndex: openEdit ? '0' : '10' }}
      >
        <FileSelectionButtons />
        <AddAuthor />
        <AddTags />
        <AddCover />
        <UploadButtons />
      </div>
      <StoryPreview />
      <TextArea />
    </>
  );
}

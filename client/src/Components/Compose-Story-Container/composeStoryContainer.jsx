import StoryUpload from './Compose-Story-Upload/storyUpload';
import SmallPreviewStory from './Small-Preview/smallPreview';
import StoryEdit from './Compose-Story-Edit/editStory';

import './composeStoryContainer.css';

export default function CoverContainer(props) {
  return (
    <div className='compose-cover-container'>
      <div className='cover-edit-title'>Story</div>
      <div className='choosefile-story-container'>
        {' '}
        <StoryUpload
          textFileInput={props.textFileInput}
          handleFilchosen={props.handleFilchosen}
          clearFileChosen={props.clearFileChosen}
        />
      </div>
      <div className='cover-edit'>
        <SmallPreviewStory settings={props.settings} />
        <StoryEdit settings={props.settings} setSettings={props.setSettings} />
      </div>
    </div>
  );
}

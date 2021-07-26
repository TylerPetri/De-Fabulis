import StoryUpload from './Compose-Story-Upload/storyUpload';
import SmallPreviewStory from './Small-Preview/smallPreview';
import StoryEdit from './Compose-Story-Edit/editStory';
import EditIcons from '../Edit-Icons/editIcons';

import './composeStoryContainer.css';

export default function CoverContainer(props) {
  return (
    <div className='compose-story-container'>
      <div className='compose-story-title'>Story</div>
      <div className='choosefile-story-container'>
        {' '}
        <StoryUpload
          textFileInput={props.textFileInput}
          handleFileChosen={props.handleFileChosen}
          clearFileChosen={props.clearFileChosen}
        />
      </div>
      <div className='story-edit'>
        <SmallPreviewStory settings={props.settings} />
        <StoryEdit settings={props.settings} setSettings={props.setSettings} />
      </div>
      <EditIcons className='edit-icons-story' />
    </div>
  );
}

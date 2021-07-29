import StoryUpload from './Compose-Story-Upload/storyUpload';
import SmallPreviewStory from './Small-Preview-Story/smallPreviewStory';
import StoryEdit from './Compose-Story-Edit/editStory';
import StoryPreview from '../Preview-story/previewStory';
import EditIcons from '../Edit-Icons/editIconsStory';

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
        <StoryPreview settings={props.settings} />
      </div>
      <EditIcons className='edit-icons-story' />
    </div>
  );
}

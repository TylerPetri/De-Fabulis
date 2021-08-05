import StoryUpload from './Compose-Story-Upload/storyUpload';
import SmallPreviewStory from './Small-Preview-Story/smallPreviewStory';
import StoryEdit from './Compose-Story-Edit/editStory';
import StoryPreview from './Preview-story/previewStory';
import EditIcons from '../Edit-Icons/editIconsStory';
import ColorOptions from '../Compose-Color-Options/colorOptionsStory';

import './composeStoryContainer.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function CoverContainer(props) {
  const [{ openStoryColors }] = useStoreContext();

  return (
    <div className='compose-story-container'>
      <div className='compose-story-title'>Story</div>
      <div className='choosefile-story-container'>
        {' '}
        <StoryUpload
          alert={props.alert}
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
      <div
        className='edit-color-story-cont'
        style={{
          opacity: openStoryColors ? '1' : '0',
          zIndex: openStoryColors ? '30' : '-1',
          transform: openStoryColors
            ? window.innerWidth > 1160
              ? 'translate(0%, -30%)'
              : window.innerWidth < 1161 && window.innerWidth > 600
              ? 'translate(20%, -30%)'
              : window.innerWidth < 600
              ? 'translate(30%, -30%)'
              : 'translat(30%, -30%)'
            : 'translate(70%, -30%)',
        }}
      >
        <ColorOptions
          settings={props.settings}
          setSettings={props.setSettings}
        />
      </div>
    </div>
  );
}

import StoryUpload from './Compose-Story-Upload/storyUpload';
import StoryEdit from './Compose-Story-Edit';
import './composeCoverCont.css';

export default function CoverContainer(props) {
  return (
    <div className='composer-cover-container'>
      <StoryUpload
        textFileInput={props.textFileInput}
        handleFilchosen={props.handleFilchosen}
        clearFileChosen={props.clearFileChosen}
      />
      <StoryEdit settings={props.settings} setSettings={props.setSettings} />
    </div>
  );
}

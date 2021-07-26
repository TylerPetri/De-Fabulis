import TextCover from './Compose-Cover-Text/composeCoverText';
import CoverEdit from './Cover-Edit/coverEdit';
import ImageCover from './Cover-Image/coverImage';
import './composeCoverCont.css';

export default function CoverContainer(props) {
  return (
    <div className='composer-cover-container'>
      <TextCover
        textFileInputCover={props.textFileInputCover}
        handleFilchosen={props.handleFilchosen}
        clearFileChosen={props.clearFileChosen}
      />
      <CoverEdit settings={props.settings} setSettings={props.setSettings} />
      <ImageCover
        imgFileInput={props.imgFileInput}
        handleFilchosen={props.handleFilchosen}
        clearFileChosen={props.clearFileChosen}
      />
    </div>
  );
}

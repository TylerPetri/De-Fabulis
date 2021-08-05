import { BsFileText } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function StoryUpload(props) {
  const [{ storyFileSelected, storyFile }] = useStoreContext();

  return (
    <div className='upload-container-story'>
      <label htmlFor='textFileStory' className='upload-label-story'>
        {props.alert ? (
          <h4 style={{ color: 'rgb(244,67,54)' }}>Must be .txt file</h4>
        ) : (
          <h3>
            Upload Story
            <BsFileText />
          </h3>
        )}
      </label>
      <input
        type='file'
        ref={props.textFileInput}
        id='textFileStory'
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
      <div
        className='textFileInput-selected'
        style={{
          width: storyFileSelected ? '175px' : '0',
          opacity: storyFileSelected ? '1' : '0',
          zIndex: storyFileSelected ? '1' : '-1',
        }}
      >
        {storyFile.slice(12).slice(0, 20) + '...'}
        <IoClose className='IoClose-story' onClick={props.clearFileChosen} />
      </div>
    </div>
  );
}

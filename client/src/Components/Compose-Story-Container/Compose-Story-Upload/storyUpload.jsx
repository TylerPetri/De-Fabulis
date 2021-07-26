import { BsFileText } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function StoryUpload(props) {
  const [{ storyFileSelected, storyFile }] = useStoreContext();

  return (
    <div className='upload-container-story'>
      <label htmlFor='textFileStory' className='upload-label-story'>
        <h3>
          Upload Story
          <BsFileText />
        </h3>
      </label>
      <input
        type='file'
        ref={props.textFileInput}
        id='textFileStory'
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
      <div className='textFileInput-selected'>
        {storyFile.slice(12)}
        <IoClose
          className='IoClose-story'
          onClick={props.clearFileChosen}
          style={{ display: storyFileSelected ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}

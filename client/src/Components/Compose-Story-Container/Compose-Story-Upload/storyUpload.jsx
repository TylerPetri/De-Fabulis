import { BsFileText } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function StoryUpload(props) {
  const [{ storyFileSelected }] = useStoreContext();

  return (
    <div className='upload-btns-container'>
      <h3>
        Upload Story
        <BsFileText />
      </h3>
      <div className='input-file-container'>
        <input
          type='file'
          ref={props.textFileInput}
          id='textFileStory'
          onChange={(event) =>
            props.handleFileChosen(
              event,
              event.target.files[0],
              event.target.id
            )
          }
        />
        <MdClose
          className='file-clear-button'
          style={{
            display: storyFileSelected ? 'block' : 'none',
          }}
          onClick={(event) => props.clearFileChosen(event)}
        />
      </div>
    </div>
  );
}

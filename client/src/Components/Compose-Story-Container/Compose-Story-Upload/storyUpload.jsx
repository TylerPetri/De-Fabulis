import { BsFileText } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function StoryUpload(props) {
  const [{ storyFileSelected }] = useStoreContext();

  return (
    <div className='cover-upload-container'>
      <h3>
        Upload Story
        <BsFileText />
      </h3>
      <input
        type='file'
        ref={props.textFileInput}
        id='textFileStory'
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
    </div>
  );
}

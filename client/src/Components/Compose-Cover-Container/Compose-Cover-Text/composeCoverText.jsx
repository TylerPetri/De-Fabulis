import { MdClose } from 'react-icons/md';
import { useStoreContext } from '../../../utils/GlobalStore';

import './composeCoverText.css';

export default function AddCover(props) {
  const [{ textCoverFileSelected }] = useStoreContext();

  return (
    <div className='cover-container'>
      <div className='cover-label'>
        <h3>Cover:</h3>
      </div>
      <div className='cover-file'>
        <input
          type='file'
          ref={props.textFileInput}
          id='textFile'
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
            display: textCoverFileSelected ? 'block' : 'none',
          }}
          onClick={props.clearFileChosen}
        />
      </div>
    </div>
  );
}

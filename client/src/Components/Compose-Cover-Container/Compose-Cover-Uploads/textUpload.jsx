import { BsFileText } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function AddCover(props) {
  const [{ textCoverFileSelected, imgFileSelected }] = useStoreContext();

  return (
    <div
      className='cover-upload-container'
      style={{
        opacity:
          !textCoverFileSelected && !imgFileSelected
            ? '1'
            : textCoverFileSelected
            ? '1'
            : '0',
      }}
    >
      <label for='textFile'>
        <h3>
          Upload Text
          <BsFileText />
        </h3>
      </label>{' '}
      <input
        type='file'
        ref={props.textFileInput}
        id='textFile'
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
    </div>
  );
}

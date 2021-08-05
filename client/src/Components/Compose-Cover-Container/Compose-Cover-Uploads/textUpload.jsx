import { BsFileText } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

export default function AddCover(props) {
  const [{ textCoverFileSelected, imgFileSelected, textCoverFile }] =
    useStoreContext();

  return (
    <div
      className='upload-container'
      style={{
        opacity:
          !textCoverFileSelected && !imgFileSelected
            ? '1'
            : textCoverFileSelected
            ? '1'
            : '0',
      }}
    >
      <label
        htmlFor='textFile'
        className={
          !textCoverFileSelected && !imgFileSelected
            ? 'upload-label'
            : textCoverFileSelected
            ? 'upload-label'
            : 'upload-label-hidden'
        }
      >
        {props.alert ? (
          <h4 style={{ color: 'rgb(244,67,54)' }}>Must be .txt file</h4>
        ) : (
          <h3>Upload Text</h3>
        )}
        <BsFileText />
      </label>{' '}
      <input
        type='file'
        ref={props.textFileInputCover}
        id={
          !textCoverFileSelected && !imgFileSelected
            ? 'textFile'
            : textCoverFileSelected
            ? 'textFile'
            : 'textFile-hidden'
        }
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
      <div
        className='coverFileInput-selected'
        style={{
          height: textCoverFileSelected ? '15px' : '0',
          opacity: textCoverFileSelected ? '1' : '0',
        }}
      >
        {textCoverFile.slice(12)}
      </div>
    </div>
  );
}

import { BsImage } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

import './fileUploads.css';

export default function CoverImage(props) {
  const [{ textCoverFileSelected, imgFileSelected, imgFile }] =
    useStoreContext();

  return (
    <div
      className='upload-container'
      style={{
        opacity:
          !textCoverFileSelected && !imgFileSelected
            ? '1'
            : imgFileSelected
            ? '1'
            : '0',
      }}
    >
      <label
        htmlFor='imgFile'
        className={
          !textCoverFileSelected && !imgFileSelected
            ? 'upload-label'
            : imgFileSelected
            ? 'upload-label'
            : 'upload-label-hidden'
        }
      >
        <h3>
          Upload Image
          <BsImage />
        </h3>
      </label>{' '}
      <input
        type='file'
        ref={props.imgFileInput}
        id={
          !textCoverFileSelected && !imgFileSelected
            ? 'imgFile'
            : imgFileSelected
            ? 'imgFile'
            : 'imgFile-hidden'
        }
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
      <div
        className='imgFileInput-selected'
        style={{
          height: imgFileSelected ? '25px' : '0',
          opacity: imgFileSelected ? '1' : '0',
          marginTop: imgFileSelected && '35px',
        }}
      >
        {imgFile.slice(12)}
      </div>
    </div>
  );
}

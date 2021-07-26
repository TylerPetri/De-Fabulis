import { BsImage } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

import './fileUploads.css';

export default function CoverImage(props) {
  const [{ textCoverFileSelected, imgFileSelected }] = useStoreContext();

  return (
    <div
      className='cover-upload-container'
      style={{
        opacity:
          !textCoverFileSelected && !imgFileSelected
            ? '1'
            : imgFileSelected
            ? '1'
            : '0',
      }}
    >
      <label for='imgFile'>
        <h3>
          Upload Image
          <BsImage />
        </h3>
      </label>{' '}
      <input
        type='file'
        ref={props.imgFileInput}
        id='imgFile'
        onChange={(event) =>
          props.handleFileChosen(event, event.target.files[0], event.target.id)
        }
      />
    </div>
  );
}

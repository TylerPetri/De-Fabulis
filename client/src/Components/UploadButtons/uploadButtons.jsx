import { TiEdit } from 'react-icons/ti';
import { BsEye, BsUpload } from 'react-icons/bs';
import { useStoreContext } from '../../utils/GlobalStore';

import './uploadButtons.css';

export default function UploadButtons() {
  const [_, dispatch] = useStoreContext();

  function openEdit() {
    dispatch({ type: 'OPEN_EDIT' });
  }

  function openPreview() {
    dispatch({ type: 'OPEN_PREVIEW' });
  }

  return (
    <div className='upload-buttons-container'>
      <div className='edit-preview-cont'>
        <button className='edit-upload-button' onClick={openEdit}>
          Edit story <TiEdit />
        </button>
      </div>
      <div className='submit-cont'>
        <button className='upload-button' onClick={openPreview}>
          Preview <BsEye />
        </button>

        <button className='upload-button'>
          Submit <BsUpload />
        </button>
      </div>
    </div>
  );
}

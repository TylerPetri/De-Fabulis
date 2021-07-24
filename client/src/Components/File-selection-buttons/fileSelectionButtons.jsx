import { BsFileText, BsImage } from 'react-icons/bs';

import './fileSelectionButtons.css';

export default function FileSelectionButtons() {
  return (
    <>
      <div className='compose-upload-container'>
        <div className='upload-btns-container'>
          <h3>Upload Story</h3>{' '}
          <div className='file'>
            <button className='upload-btns'>
              Choose Story
              <BsFileText />
            </button>
            <h4>No file selected</h4>
          </div>
        </div>
        <div className='upload-btns-container'>
          <h3>Upload Image</h3>
          <div className='file'>
            <button className='upload-btns'>
              Choose Image
              <BsImage />
            </button>
            <h4>No file selected</h4>
          </div>
        </div>
      </div>
    </>
  );
}

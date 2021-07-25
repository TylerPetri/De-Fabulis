import { BsFileText, BsImage } from 'react-icons/bs';

import './fileSelectionButtons.css';

export default function FileSelectionButtons(props) {
  return (
    <>
      <div className='compose-upload-container'>
        <div className='upload-btns-container'>
          <h3>
            Upload Story
            <BsFileText />
          </h3>
          <input
            type='file'
            ref={props.textFileInput}
            id='textFileStory'
            onChange={(e) =>
              props.handleFileChosen(e.target.files[0], e.target.id)
            }
          />
        </div>
        <div className='upload-btns-container'>
          <h3>
            Upload Image
            <BsImage />
          </h3>
          <input type='file' ref={props.imgFileInput} id='imgFile' />
        </div>
      </div>
    </>
  );
}

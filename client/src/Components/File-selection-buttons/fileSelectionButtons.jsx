import { useState } from 'react';
import { BsFileText, BsImage } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useStoreContext } from '../../utils/GlobalStore';

import './fileSelectionButtons.css';

export default function FileSelectionButtons(props) {
  const [{ storyFileSelected, imgFileSelected }] = useStoreContext();

  return (
    <>
      <div className='compose-upload-container'>
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
        <div className='upload-btns-container'>
          <h3>
            Upload Image
            <BsImage />
          </h3>{' '}
          <div className='input-file-container'>
            <input
              type='file'
              ref={props.imgFileInput}
              id='imgFile'
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
                display: imgFileSelected ? 'block' : 'none',
              }}
              onClick={(event) => props.clearFileChosen(event)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

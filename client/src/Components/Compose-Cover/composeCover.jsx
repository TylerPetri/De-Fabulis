import { useState, useRef } from 'react';
import { BsFileText, BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs';

import './composeCover.css';

export default function AddCover(props) {
  const [expand, setExpand] = useState(false);

  function toggleExpand() {
    !expand ? setExpand(true) : setExpand(false);
  }

  return (
    <div className='cover-container'>
      <div className='cover-label'>
        <h3>Add cover:</h3>
      </div>
      <div className='cover-file'>
        <input
          type='file'
          ref={props.textFileInput}
          id='textFile'
          onChange={(e) =>
            props.handleFileChosen(e.target.files[0], e.target.id)
          }
        />
      </div>
      <div className='alter-size-cover'>
        {!expand ? (
          <BsArrowsExpand
            className='alter-size-button'
            onClick={toggleExpand}
          />
        ) : (
          <BsArrowsCollapse
            className='alter-size-button'
            onClick={toggleExpand}
          />
        )}
      </div>
      <textarea
        name='cover-compose-area'
        className='cover-compose-area'
        style={{ height: expand ? '300px' : '125px' }}
      ></textarea>
    </div>
  );
}

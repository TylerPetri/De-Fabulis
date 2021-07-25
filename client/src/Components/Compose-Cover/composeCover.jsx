import { useState } from 'react';
import { BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs';

import './composeCover.css';

export default function AddCover(props) {
  const [expand, setExpand] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  function toggleExpand() {
    !expand ? setExpand(true) : setExpand(false);
  }

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 400) {
      setCharacterCount(event.target.value.length);
    }
  };

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
      <div className='character-count-cover'>{characterCount}/400</div>
      <textarea
        className='cover-compose-area'
        style={{ height: expand ? '300px' : '125px' }}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

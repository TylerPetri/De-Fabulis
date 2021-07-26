import { useState, useRef, useEffect } from 'react';
import { BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import './composeCover.css';

export default function AddCover(props) {
  const [expand, setExpand] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const textArea = useRef();

  useEffect(() => {
    setCharacterCount(props.cover.length);
  }, [props.cover]);

  function toggleExpand() {
    !expand ? setExpand(true) : setExpand(false);
  }

  function handleChange() {
    props.dispatch({
      type: 'SET_ONE',
      data: { cover: textArea.current.value },
    });
  }

  function logs() {
    console.log(textArea.current.value);
  }

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
            display: props.coverFileSelected ? 'block' : 'none',
          }}
          onClick={props.clearFileChosen}
        />
      </div>
      <button onClick={logs}>logs</button>

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
      <div
        className='character-count-cover'
        style={{ color: characterCount > 400 ? 'red' : 'grey' }}
      >
        {characterCount}/400
      </div>
      <textarea
        className='cover-compose-area'
        style={{ height: expand ? '300px' : '125px' }}
        value={props.cover}
        ref={textArea}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

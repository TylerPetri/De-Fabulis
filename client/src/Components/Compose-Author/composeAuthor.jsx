import { useState, useRef } from 'react';

export default function AddAuthor() {
  const [author, setAuthor] = useState(['Edison', 'Arthra', 'Eli']);

  const authorInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addAuthor();
    }
  }

  function addAuthor() {
    setAuthor([...author, authorInput.current.value]);
    authorInput.current.value = '';
  }

  function removeAuthor(idx) {
    const remove = author.splice(idx, 1);
    const filter = author.filter((a) => a !== remove);
    setAuthor(filter);
  }

  return (
    <>
      <div className='compose-tags-container'>
        <h3>Add Author: </h3>
        <div className='compose-tags-display'>
          <input
            className='add-tags-input'
            spellCheck='false'
            ref={authorInput}
            onKeyPress={(event) => handleKeyPress(event)}
          />
          {author.length > 0 &&
            author.map((tag, idx) => (
              <div
                className='compose-tags'
                key={idx}
                onClick={() => removeAuthor(idx)}
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

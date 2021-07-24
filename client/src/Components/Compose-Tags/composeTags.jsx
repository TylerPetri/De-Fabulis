import { useState, useRef } from 'react';

import './composeTags.css';

export default function AddTags() {
  const [tags, setTags] = useState(['Fantasy', 'Horror', 'Scifi']);

  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag();
    }
  }

  function addTag() {
    setTags([...tags, tagsInput.current.value]);
    tagsInput.current.value = '';
  }

  function removeTag(idx) {
    const remove = tags.splice(idx, 1);
    const filter = tags.filter((a) => a !== remove);
    setTags(filter);
  }

  return (
    <>
      <div className='compose-tags-container'>
        <h3>Add Tags: </h3>
        <div className='compose-tags-display'>
          <input
            className='add-tags-input'
            spellCheck='false'
            ref={tagsInput}
            onKeyPress={(event) => handleKeyPress(event)}
          />
          {tags.length > 0 &&
            tags.map((tag, idx) => (
              <div
                className='compose-tags'
                key={idx}
                onClick={() => removeTag(idx)}
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

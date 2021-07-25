import { useRef } from 'react';

import './composeTags.css';

export default function AddTags(props) {
  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag();
    }
  }

  function addTag() {
    props.setTags([...props.tags, tagsInput.current.value]);
    tagsInput.current.value = '';
  }

  function removeTag(idx) {
    const remove = props.tags.splice(idx, 1);
    const filter = props.tags.filter((a) => a !== remove);
    props.setTags(filter);
  }

  return (
    <>
      <div className='compose-title-tags-container'>
        <h3>Tags: </h3>
        <div className='compose-title-tags-display'>
          <input
            className='add-tags-input'
            spellCheck='false'
            ref={tagsInput}
            onKeyPress={(event) => handleKeyPress(event)}
          />
          {props.tags.length > 0 &&
            props.tags.map((tag, idx) => (
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

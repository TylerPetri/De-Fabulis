import { useState, useRef } from 'react';
import { useStoreContext } from '../../utils/GlobalStore';

import './composeTags.css';

export default function AddTags(props) {
  const [{ currentStory }, dispatch] = useStoreContext();
  const [temp, setTemp] = useState([currentStory]);
  const [tags, setTags] = useState([]);

  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag();
    }
  }

  function addTag() {
    setTags([...tags, tagsInput.current.value]);
    tagsInput.current.value = '';
    setTemp([...temp, (temp[0].tags = tags)]);
  }

  function removeTag(idx) {
    const remove = tags.splice(idx, 1);
    const filter = tags.filter((a) => a !== remove);
    setTags(filter);
    setTemp([...temp, (temp[0].tags = tags)]);
  }

  function logs() {
    console.log(tags, temp, currentStory);
  }

  return (
    <>
      <button onClick={logs}>logs</button>
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

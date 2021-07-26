import { useRef, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalStore';

import './composeTags.css';

export default function AddTags(props) {
  const [{ currentStory }, dispatch] = useStoreContext();
  const [tags, setTags] = useState([]);
  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag();
    }
  }

  function addTag() {
    let temp = [currentStory];

    setTags([...tags, tagsInput.current.value]);

    temp[0].tags.length > 0
      ? temp[0].tags.push(tagsInput.current.value)
      : (temp[0].tags = tagsInput.current.value);

    tagsInput.current.value = '';
    props.handleTempDispatch();
  }

  function removeTag(idx) {
    let temp = [currentStory];

    const remove = tags.splice(idx, 1);
    const filter = tags.filter((a) => a !== remove);
    setTags(filter);

    temp[0].tags = filter;
    props.handleTempDispatch();
  }

  function logs() {
    console.log(currentStory);
  }

  return (
    <>
      <button onClick={logs}>logs</button>
      <div className='compose-title-tags-container'>
        <h3>Tags: </h3>
        <div className='compose-title-tags-display'>
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

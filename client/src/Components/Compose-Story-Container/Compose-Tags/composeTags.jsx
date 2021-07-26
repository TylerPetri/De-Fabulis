import { useRef } from 'react';
import { useStoreContext } from '../../../utils/GlobalStore';

import './composeTags.css';

export default function AddTags() {
  const [{ currentTags }, dispatch] = useStoreContext();
  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag();
    }
  }

  function addTag() {
    dispatch({
      type: 'SET',
      data: { currentTags: [...currentTags, tagsInput.current.value] },
    });
    tagsInput.current.value = '';
  }

  function removeTag(idx) {
    const temp = currentTags;
    const remove = temp.splice(idx, 1);
    const filter = temp.filter((a) => a !== remove);

    dispatch({
      type: 'SET',
      data: { currentTags: filter },
    });
  }

  return (
    <>
      <div className='compose-tags-container'>
        <h3>Tags: </h3>
        <div className='compose-tags-display'>
          <input
            className='add-tags-input'
            spellCheck='false'
            ref={tagsInput}
            onKeyPress={(event) => handleKeyPress(event)}
          />
          {currentTags.length > 0 &&
            currentTags.map((tag, idx) => (
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

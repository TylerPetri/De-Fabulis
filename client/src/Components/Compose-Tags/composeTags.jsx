import { useRef, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalStore';

import './composeTags.css';

export default function AddTags() {
  const [{ currentTags }, dispatch] = useStoreContext();
  const [alert, setAlert] = useState(0);

  const tagsInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag(event);
    }
  }

  function addTag(event) {
    let tag = tagsInput.current.value;
    let result = tag.charAt(0).toUpperCase() + tag.slice(1);

    if (!currentTags.includes(result)) {
      dispatch({
        type: 'SET',
        data: {
          currentTags: [...currentTags, result],
        },
      });
      tagsInput.current.value = '';
    } else {
      let children = event.target.nextSibling.children;

      for (let i = 0; i < children.length; i++) {
        if (children[i].outerText === result) children[i].id = 'alert';
        setTimeout(() => (children[i].id = ''), 2000);
      }
    }
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
        <input
          className='add-tags-input'
          spellCheck='false'
          ref={tagsInput}
          onKeyPress={(event) => handleKeyPress(event)}
        />
        <div className='compose-tags-box'>
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

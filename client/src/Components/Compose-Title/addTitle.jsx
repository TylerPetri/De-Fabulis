import { useRef } from 'react';

export default function AddTitle(props) {
  const titleInput = useRef();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      props.setTemp([
        ...props.temp,
        (props.temp[0].title = titleInput.current.value),
      ]);
      titleInput.current.value = '';
      props.dispatch({
        type: 'SET_CURRENT_STORY',
        data: { currentStory: props.temp[0] },
      });
    }
  }

  function removeTitle() {
    props.setTemp([...props.temp, (props.temp[0].title = '')]);
  }

  return (
    <>
      <div className='compose-tags-container'>
        <h3>Add Title: </h3>
        <div className='compose-tags-display'>
          <input
            className='add-tags-input'
            spellCheck='false'
            ref={titleInput}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          {props.temp[0].title.length > 0 && (
            <div className='compose-tags' onClick={removeTitle}>
              {props.temp[0].title}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

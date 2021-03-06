import { useRef } from 'react';
import ColorOptions from '../../Compose-Color-Options/colorOptionsCover';
import { FcCheckmark } from 'react-icons/fc';

import { useStoreContext } from '../../../utils/GlobalStore';

import './coverEdit.css';

export default function CompCoverEdit(props) {
  const [
    { openCoverEdit, title, imageCover, textCover, scrollHeight },
    dispatch,
  ] = useStoreContext();

  const coverInput = useRef();
  const titleInput = useRef();

  function closeEdit() {
    for (let i = 0; i < props.coverSettings.length; i++) {
      props.coverSettings[i].dropdown = false;
    }
    dispatch({ type: 'SET', data: { openCoverEdit: false } });
  }

  function handleChange(e) {
    e.target.className === 'edit-cover-title focus-visible'
      ? dispatch({ type: 'SET', data: { title: titleInput.current.value } })
      : dispatch({
          type: 'SET',
          data: { textCover: coverInput.current.value },
        });
  }

  return (
    <>
      <div
        className='fill-background-color'
        style={{
          minHeight: window.innerHeight,
          height: scrollHeight + 100,
          opacity: openCoverEdit ? '1' : '0',
          zIndex: openCoverEdit ? '50' : '-1',
          backgroundColor: 'rgb(0,0,0,0.9)',
        }}
      ></div>
      <div
        className='edit-compose-container'
        style={{
          opacity: openCoverEdit ? '1' : '0',
          zIndex: openCoverEdit ? '50' : '-1',
        }}
      >
        <div className='edit-cover-container'>
          <div className='cover-edit-colors-cont'>
            <ColorOptions
              settings={props.coverSettings}
              setSettings={props.setCoverSettings}
            />
            <FcCheckmark className='fc-cover-edit' onClick={closeEdit} />
          </div>
          <div className='card'>
            <textarea
              placeholder='Cover here'
              className='edit-cover'
              style={{
                color: props.coverSettings[0].color,
                backgroundColor: props.coverSettings[1].color,
              }}
              value={
                imageCover.length > 0
                  ? `${imageCover}`
                  : `${textCover.slice(0, 150)}`
              }
              ref={coverInput}
              onChange={handleChange}
            />
            <textarea
              placeholder='Title here'
              className='edit-cover-title'
              style={{
                color: props.coverSettings[2].color,
                backgroundColor: props.coverSettings[3].color,
              }}
              ref={titleInput}
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

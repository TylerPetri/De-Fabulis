import React, { useRef } from 'react';
import Navbar from '../../Components/Navbar/navbar';
import fetchJSON from '../../utils/API';
import './compose.css';

export default function Compose() {
  const composeArea = useRef();

  const username = 'test';
  // const image = '';

  async function submitForm() {
    const data = {
      username: username,
      stody: composeArea.current.value,
      // image: image,
    };
    await fetchJSON('/api/stories', 'post', data);
  }

  return (
    <>
      <Navbar />
      <div className='compose-wrapper'>
        <div className='compose-card'>
          <textarea
            ref={composeArea}
            name='compose-area'
            placeholder='Compose here'
            className='compose-area'
          />
        </div>
        <button onClick={submitForm} className='compose-submit'>
          Submit
        </button>
      </div>
    </>
  );
}

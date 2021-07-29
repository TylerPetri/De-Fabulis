import Navbar from '../../Components/Navbar/navbar';
import Cards from '../../Components/Read-Cards/readCards';
import StoryPopup from '../../Components/Story-Popup/storyPopup';

import './read.css';
import { useStoreContext } from '../../utils/GlobalStore';
import { useEffect } from 'react';

export default function Read() {
  const [{ data }, dispatch] = useStoreContext();

  useEffect(() => dispatch({ type: 'CLEAR_SELECTED_FILES' }), []);

  function openStoryPopup(
    username,
    createdAt,
    tags,
    title,
    textCover,
    imgCover,
    story,
    storySettings,
    coverSettings
  ) {
    dispatch({
      type: 'SET',
      data: {
        username: username,
        createdAt: createdAt,
        tags: tags,
        title: title,
        textCover: textCover,
        imgCover: imgCover,
        story: story,
        storySettings: storySettings,
        coverSettings: coverSettings,
      },
    });
    dispatch({ type: 'SET', data: { openStory: true } });
  }

  return (
    <>
      <Navbar openStoryPopup={openStoryPopup} />
      <StoryPopup />
      <div className='cards-container'>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <Cards
                key={item.createdAt}
                item={item}
                openStoryPopup={openStoryPopup}
              />
            );
          })
        ) : (
          <h2>No stories in database</h2>
        )}
      </div>
    </>
  );
}

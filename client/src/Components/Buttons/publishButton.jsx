import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import fetchJSON from '../../utils/API';
import { handleAuth } from '../../utils/HandleAuth';
import { useStoreContext } from '../../utils/GlobalStore';

import loadingRoll from '../../assets/Rolling-1s-200px.svg';
import './buttons.css';

export default function UploadButtons(props) {
  const [
    { user, currentTags, title, imageCover, textCover, story, submitted },
    dispatch,
  ] = useStoreContext();
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorHasOccurred, setErrorHasOccurred] = useState(false);
  const history = useHistory();

  let username = sessionStorage.libraryOfStories_user;

  async function authentication() {
    const res = await handleAuth();
    if (res.userLoggedIn === false && res.user === '') {
      dispatch({
        type: 'SET',
        data: { userLoggedIn: false, user: '' },
      });
    } else if (res.userLoggedIn === true && res.user === username) {
      dispatch({
        type: 'SET',
        data: { userLoggedIn: true, user: username },
      });
    } else if (res.mustBeLoggedIn === true) {
      dispatch({
        type: 'SET',
        data: { userLoggedIn: false, mustBeLoggedIn: true },
      });
    } else if (res === 'Authentication failed') {
      dispatch({
        type: 'SET',
        data: { userLoggedIn: false, mustBeLoggedIn: true },
      });
    } else {
      return 'Error';
    }
  }

  async function handleSubmit() {
    // const res = await handleAuth();
    // if (res.userLoggedIn === true && res.user === username) {
    //   const data = {
    //     username: user,
    //     createdAt: Date.now(),
    //     tags: currentTags,
    //     title: title,
    //     textCover: textCover,
    //     imageCover: imageCover,
    //     story: story,
    //     storySettings: {
    //       font: props.storySettings[0].color,
    //       textBackground: props.storySettings[1].color,
    //       background: props.storySettings[2].color,
    //     },
    //     coverSettings: {
    //       font: props.coverSettings[0].color,
    //       background: props.coverSettings[1].color,
    //       titleFont: props.coverSettings[2].color,
    //       titleBackground: props.coverSettings[3].color,
    //     },
    //   };
    //   setLoadingAnimation(true);
    //   const res = await fetchJSON('/api/publish', 'POST', data);
    if (currentTags.length > 0)
      await fetchJSON('/api/tags', 'POST', {
        tags: currentTags,
      });

    //   if (res.message) setLoadingAnimation(false);
    //   if (res.message === 'Error has occurred') {
    //     setErrorHasOccurred(true);
    //   } else if (res.message === 'Added item') {
    //     dispatch({ type: 'SET', data: { submitted: !submitted } });
    //     history.push('/browse');
    //   }
    // } else {
    //   dispatch({
    //     type: 'SET',
    //     data: { mustBeLoggedIn: true },
    //   });
    // }
    // authentication();
  }

  return (
    <div className='upload-button-container'>
      {loadingAnimation ? (
        <img
          src={loadingRoll}
          alt='loading-roll animation'
          className='loading-roll-animation'
        />
      ) : errorHasOccurred ? (
        <h2>Error has occurred</h2>
      ) : (
        <Button variant='contained' color='secondary' onClick={handleSubmit}>
          <div className='submit-compose-btn'>Publish</div>
        </Button>
      )}{' '}
    </div>
  );
}

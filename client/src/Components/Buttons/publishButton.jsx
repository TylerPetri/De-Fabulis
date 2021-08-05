import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import fetchJSON from '../../utils/API';

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

  async function handleSubmit() {
    const data = {
      username: user.charAt(0).toUpperCase() + user.slice(1),
      createdAt: Date.now(),
      tags: currentTags,
      title: title,
      textCover: textCover,
      imgCover: imageCover,
      story: story,
      storySettings: {
        font: props.storySettings[0].color,
        textBackground: props.storySettings[1].color,
        background: props.storySettings[2].color,
      },
      coverSettings: {
        font: props.coverSettings[0].color,
        background: props.coverSettings[1].color,
        titleFont: props.coverSettings[2].color,
        titleBackground: props.coverSettings[3].color,
      },
    };
    setLoadingAnimation(true);
    const res = await fetchJSON('/api/publish', 'POST', data);
    if (res.message) setLoadingAnimation(false);
    if (res.message === 'Error has occurred') {
      setErrorHasOccurred(true);
    } else if (res.message === 'Added item') {
      dispatch({ type: 'SET', data: { submitted: !submitted } });
      history.push('/browse');
    }
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

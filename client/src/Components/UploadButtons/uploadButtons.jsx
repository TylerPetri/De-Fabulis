import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import fetchJSON from '../../utils/API';

import { useStoreContext } from '../../utils/GlobalStore';

import './uploadButtons.css';

export default function UploadButtons(props) {
  const [
    { user, currentTags, title, imageCover, textCover, story, submitted },
    dispatch,
  ] = useStoreContext();
  const history = useHistory();

  function handleSubmit() {
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
      },
    };
    fetchJSON('/api/publish', 'POST', data);
    dispatch({ type: 'SET', data: { submitted: !submitted } });
    history.push('/browse');
  }

  return (
    <div className='upload-button-container'>
      <Button variant='contained' color='secondary' onClick={handleSubmit}>
        <div className='submit-compose-btn'>Publish</div>
      </Button>
    </div>
  );
}

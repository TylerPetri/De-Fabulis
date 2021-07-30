import Button from '@material-ui/core/Button';

import { useStoreContext } from '../../utils/GlobalStore';

import './uploadButtons.css';

export default function UploadButtons() {
  const [_, dispatch] = useStoreContext();

  return (
    <div className='upload-button-container'>
      <Button variant='contained' color='secondary'>
        <div className='submit-compose-btn'>Publish</div>
      </Button>
    </div>
  );
}

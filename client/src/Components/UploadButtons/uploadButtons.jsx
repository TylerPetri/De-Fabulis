import { BsUpload } from 'react-icons/bs';
import { useStoreContext } from '../../utils/GlobalStore';

import './uploadButtons.css';

export default function UploadButtons() {
  const [_, dispatch] = useStoreContext();

  return (
    <div className='upload-button-container'>
      <button className='upload-button'>
        Publish <BsUpload />
      </button>
    </div>
  );
}

import TextCover from './Compose-Cover-Uploads/textUpload';
import CoverEdit from './Compose-Cover-Edit/coverEdit';
import ImageCover from './Compose-Cover-Uploads/imageUpload';
import EditIcons from '../Edit-Icons/editIcons';
import { IoClose } from 'react-icons/io5';

import { useStoreContext } from '../../utils/GlobalStore';
import './composeCoverCont.css';

export default function CoverContainer(props) {
  const [{ textCoverFileSelected, imgFileSelected, uploadCoverFileX }] =
    useStoreContext();

  return (
    <div className='compose-cover-container'>
      <div className='cover-edit-title'>Cover</div>

      <div className='choosefile-grid-container'>
        {' '}
        <IoClose
          className='IoClose'
          onClick={props.clearFileChosen}
          style={{
            display: uploadCoverFileX ? 'block' : 'none',
          }}
        />
        <div
          className='choosefile-container'
          style={{
            marginTop: textCoverFileSelected
              ? '25px'
              : imgFileSelected
              ? '-45px'
              : '0',
          }}
        >
          <TextCover
            textFileInputCover={props.textFileInputCover}
            handleFileChosen={props.handleFileChosen}
          />
          <ImageCover
            imgFileInput={props.imgFileInput}
            handleFileChosen={props.handleFileChosen}
          />
        </div>
      </div>
      <div className='cover-edit'>
        <CoverEdit />
      </div>
      <div className='edit-icons-cover'>
        <EditIcons />
      </div>
    </div>
  );
}

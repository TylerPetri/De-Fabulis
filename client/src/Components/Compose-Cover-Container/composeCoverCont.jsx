import TextCover from './Compose-Cover-Uploads/textUpload';
import SmallPreviewCover from './Small-Preview-Cover/smallPreviewCover';
import CoverEdit from './Compose-Cover-Edit/coverEdit';
import ImageCover from './Compose-Cover-Uploads/imageUpload';
import EditIcons from '../Edit-Icons/editIconsCover';
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
        <SmallPreviewCover />
        <CoverEdit settings={props.settings} setSettings={props.setSettings} />
        <div className='edit-icons-cover'>
          <EditIcons />
        </div>
      </div>
    </div>
  );
}

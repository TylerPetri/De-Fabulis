import TextCover from './Compose-Cover-Uploads/textUpload';
import CoverEdit from './Compose-Cover-Edit/coverEdit';
import ImageCover from './Compose-Cover-Uploads/imageUpload';

import { useStoreContext } from '../../utils/GlobalStore';
import './composeCoverCont.css';

export default function CoverContainer(props) {
  const [{ textCoverFileSelected, imgFileSelected }] = useStoreContext();

  return (
    <div className='compose-cover-container'>
      <div className='cover-edit-title'>Cover</div>
      <div className='choosefile-grid-container'>
        <div
          className='choosefile-container'
          style={{
            marginTop: textCoverFileSelected
              ? '60px'
              : imgFileSelected
              ? '-60px'
              : '0',
          }}
        >
          <TextCover
            textFileInputCover={props.textFileInputCover}
            handleFileChosen={props.handleFileChosen}
            clearFileChosen={props.clearFileChosen}
          />
          <ImageCover
            imgFileInput={props.imgFileInput}
            handleFileChosen={props.handleFileChosen}
            clearFileChosen={props.clearFileChosen}
          />
        </div>
      </div>
      <div className='cover-edit'>
        <CoverEdit />
      </div>
    </div>
  );
}

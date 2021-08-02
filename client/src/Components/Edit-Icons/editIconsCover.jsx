import { TiEdit } from 'react-icons/ti';
import { FaEye } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';

import './editIcons.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function EditIcons() {
  const [{ openCoverColors }, dispatch] = useStoreContext();

  function openCoverEdit() {
    dispatch({
      type: 'SET',
      data: {
        openCoverEdit: true,
        openEditColors: false,
        openCoverColors: false,
      },
    });
  }

  function toggleCoverColors() {
    openCoverColors
      ? dispatch({ type: 'SET', data: { openCoverColors: false } })
      : dispatch({ type: 'SET', data: { openCoverColors: true } });
  }

  function openCoverPreview() {
    dispatch({
      type: 'SET',
      data: {
        openCoverPreview: true,
        openEditColors: false,
        openCoverColors: false,
      },
    });
  }

  return (
    <div className='edit-icons-container'>
      <TiEdit className='edit-icons' onClick={openCoverEdit} />
      <IoColorPalette className='edit-icons' onClick={toggleCoverColors} />
      <FaEye className='edit-icons' onClick={openCoverPreview} />
    </div>
  );
}

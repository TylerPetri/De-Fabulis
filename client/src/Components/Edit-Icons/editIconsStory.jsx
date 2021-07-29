import { TiEdit } from 'react-icons/ti';
import { FaEye } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';

import './editIcons.css';
import { useStoreContext } from '../../utils/GlobalStore';

export default function EditIcons() {
  const [_, dispatch] = useStoreContext();

  function openStoryEdit() {
    dispatch({ type: 'SET', data: { openStoryEdit: true } });
  }

  function openStoryPreview() {
    dispatch({ type: 'SET', data: { openStoryPreview: true } });
  }

  return (
    <div className='edit-icons-container'>
      <TiEdit className='edit-icons' onClick={openStoryEdit} />
      <IoColorPalette className='edit-icons' />
      <FaEye className='edit-icons' onClick={openStoryPreview} />
    </div>
  );
}

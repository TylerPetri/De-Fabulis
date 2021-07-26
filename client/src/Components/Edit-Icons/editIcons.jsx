import { TiEdit } from 'react-icons/ti';
import { IoColorPalette } from 'react-icons/io5';

import './editIcons.css';

export default function EditIcons() {
  return (
    <div className='edit-icons-container'>
      <TiEdit className='edit-icons' />
      <IoColorPalette className='edit-icons' />
    </div>
  );
}

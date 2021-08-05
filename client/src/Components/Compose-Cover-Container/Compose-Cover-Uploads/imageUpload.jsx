import { useRef } from 'react';
import { BsImage } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';

import './fileUploads.css';

export default function CoverImage(props) {
  const [{ textCoverFileSelected, imgFileSelected, imgFile }, dispatch] =
    useStoreContext();

  const imgFileInput = useRef();

  async function handleImageUpload(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('image', imgFileInput.current.files[0]);
    async function postImage() {
      try {
        const res = await fetch('/api/image-upload', {
          mode: 'cors',
          method: 'POST',
          body: data,
        });
        if (!res.ok) throw new Error(res.statusText);
        const postResponse = await res.json();
        dispatch({
          type: 'SET',
          data: {
            imageCover: postResponse.Location,
            imgFile: event.target.value,
            imgFileSelected: true,
          },
        });
        setTimeout(() => dispatch({ type: 'X_ON' }), 500);
        return postResponse.Location;
      } catch (error) {
        console.log(error);
      }
    }
    postImage();
  }

  return (
    <>
      <div
        className='upload-container'
        style={{
          opacity:
            !textCoverFileSelected && !imgFileSelected
              ? '1'
              : imgFileSelected
              ? '1'
              : '0',
        }}
      >
        <label
          htmlFor='imgFile'
          className={
            !textCoverFileSelected && !imgFileSelected
              ? 'upload-label'
              : imgFileSelected
              ? 'upload-label'
              : 'upload-label-hidden'
          }
        >
          <h3>
            Upload Image
            <BsImage />
          </h3>
        </label>{' '}
        <input
          type='file'
          ref={imgFileInput}
          id={
            !textCoverFileSelected && !imgFileSelected
              ? 'imgFile'
              : imgFileSelected
              ? 'imgFile'
              : 'imgFile-hidden'
          }
          onChange={handleImageUpload}
        />
        <div
          className='imgFileInput-selected'
          style={{
            height: imgFileSelected ? '25px' : '0',
            opacity: imgFileSelected ? '1' : '0',
            marginTop: imgFileSelected && '35px',
          }}
        >
          {imgFile.slice(12)}
        </div>
      </div>
    </>
  );
}

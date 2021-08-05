import { useRef, useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { useStoreContext } from '../../../utils/GlobalStore';
import loadgif from '../../../assets/Rolling-1s-200px.svg';

import './fileUploads.css';

export default function CoverImage(props) {
  const [{ textCoverFileSelected, imgFileSelected, imgFile }, dispatch] =
    useStoreContext();
  const [loading, setLoading] = useState(false);

  const imgFileInput = useRef();

  async function handleImageUpload(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('image', imgFileInput.current.files[0]);
    async function postImage() {
      setLoading(true);
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
        setLoading(false);
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
          {loading ? (
            <div className='img-upload-loading-cont'>
              <img
                src={loadgif}
                alt='loading animation'
                className='img-upload-loading'
              />
            </div>
          ) : (
            <h3>
              Upload Image
              <BsImage />
            </h3>
          )}
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

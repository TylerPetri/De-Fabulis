import './cards.css';

export default function Cards(props) {
  return (
    <>
      <div className='card'>
        <div className='author'>{props.item.username}</div>
        <div className='story'>{props.item.story}</div>
      </div>
    </>
  );
}

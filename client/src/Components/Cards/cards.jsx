import './cards.css';

export default function Cards(props) {
  return (
    <>
      <div className='card'>
        <div className='story'>{props.item.story}</div>
        <div className='title'>{props.item.title}</div>
      </div>
    </>
  );
}

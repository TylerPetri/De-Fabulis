import './cards.css';

export default function Cards(props) {
  function see() {
    console.log(props.item);
  }
  return (
    <>
      <div className='card'>
        <div className='author'>{props.item.username}</div>
        <div className='story'>{props.item.story}</div>
        <button onClick={see}>test</button>
      </div>
    </>
  );
}

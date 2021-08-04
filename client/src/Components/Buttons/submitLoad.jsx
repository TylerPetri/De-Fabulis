import Button from '@material-ui/core/Button';
import loadingRoll from '../../assets/Rolling-1s-200px.svg';

export default function LoadingRoll(props) {
  return (
    <>
      <div className='loadingRoll-submit-container'>
        {props.loadingAnimation ? (
          <img
            src={loadingRoll}
            alt='loading-roll animation'
            className='loading-roll-animation'
          />
        ) : props.errorHasOccurred ? (
          <h2>Error has occurred</h2>
        ) : (
          <Button
            variant='contained'
            color='secondary'
            onClick={props.function}
          >
            <div className={props.class}>ENTER</div>
          </Button>
        )}{' '}
      </div>
    </>
  );
}

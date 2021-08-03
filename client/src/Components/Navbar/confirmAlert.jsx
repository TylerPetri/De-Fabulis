export default function Confirm(props) {
  return (
    <div
      className='alert-wrapper'
      style={{
        opacity: props.alert ? '1' : '0',
        zIndex: props.alert ? '20' : '-1',
      }}
    >
      <div className='alert-container'>
        <h4 className='alert-message'>
          Are you sure you want to exit? All progress will be lost
        </h4>
        <div className='alert-btn-cont'>
          <button
            className='alert-btn'
            onClick={() => props.handleAlert('back')}
          >
            <h4>Go back</h4>
          </button>
          <button
            className='alert-btn'
            onClick={() => props.handleAlert('forward')}
          >
            <h4>Continue</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

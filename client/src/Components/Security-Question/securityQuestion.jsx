import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function SecurityQuestion(props) {
  const handleClickShowPassword = () => {
    props.setValues({
      ...props.values,
      showSecurityAnswer: !props.values.showSecurityAnswer,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <FormControl variant='outlined'>
        <InputLabel
          htmlFor='outlined-adornment-input'
          className={props.classes.root}
        >
          Security Question
        </InputLabel>
        <OutlinedInput
          color='secondary'
          classes={props.outlinedInputClasses}
          id='outlined-adornment-input'
          value={props.values.securityQuestion}
          onChange={props.handleChange('securityQuestion')}
          labelWidth={130}
        />{' '}
      </FormControl>
      <FormControl variant='outlined'>
        <InputLabel
          htmlFor='outlined-adornment-input'
          className={props.classes.root}
        >
          Answer
        </InputLabel>
        <OutlinedInput
          color='secondary'
          classes={props.outlinedInputClasses}
          id='outlined-adornment-input'
          type={props.values.showSecurityAnswer ? 'text' : 'password'}
          value={props.values.securityAnswer}
          onChange={props.handleChange('securityAnswer')}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle securityAnswer visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {props.values.showSecurityAnswer ? (
                  <MdVisibility style={{ color: '#11cb5f' }} />
                ) : (
                  <MdVisibilityOff style={{ color: '#11cb5f' }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={54}
        />{' '}
      </FormControl>
    </>
  );
}

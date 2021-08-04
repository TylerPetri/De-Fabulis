import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function PasswordOrAnswer(props) {
  const handleChange = (prop) => (event) => {
    props.setValues({ ...props.values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (option) => {
    if (option === 'first') {
      props.setValues({
        ...props.values,
        showPassword1: !props.values.showPassword1,
      });
    }
    if (option === 'second') {
      props.setValues({
        ...props.values,
        showPassword2: !props.values.showPassword2,
      });
    }
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
          {props.label}
        </InputLabel>
        <OutlinedInput
          color='secondary'
          classes={props.outlinedInputClasses}
          id='outlined-adornment-input'
          type={props.clickShow ? 'text' : 'password'}
          value={props.value}
          onChange={handleChange(props.changeParam)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => handleClickShowPassword(props.clickParam)}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {props.clickShow ? (
                  <MdVisibility style={{ color: '#11cb5f' }} />
                ) : (
                  <MdVisibilityOff style={{ color: '#11cb5f' }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={props.width}
        />{' '}
      </FormControl>
    </>
  );
}

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

export default function SecurityQuestion(props) {
  const handleChange = (prop) => (event) => {
    props.setValues({ ...props.values, [prop]: event.target.value });
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
          onChange={handleChange('securityQuestion')}
          labelWidth={130}
        />{' '}
      </FormControl>
    </>
  );
}

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

export default function Username(props) {
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
          Username
        </InputLabel>
        <OutlinedInput
          color='secondary'
          classes={props.outlinedInputClasses}
          id='outlined-adornment-input'
          value={props.values.username}
          onChange={handleChange('username')}
          labelWidth={75}
        />{' '}
      </FormControl>
    </>
  );
}

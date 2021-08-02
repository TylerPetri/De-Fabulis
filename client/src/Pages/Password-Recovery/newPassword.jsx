import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Button from '@material-ui/core/Button';

import Navbar from '../../Components/Navbar/navbar';
import fetchJSON from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalStore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    color: 'orange',
  },
  label: {
    color: 'orange',
  },
}));

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    '& $notchedOutline': {
      borderColor: 'grey',
    },
    '&:hover $notchedOutline': {
      borderColor: '#651fff',
    },
    '&$focused $Outline': {
      borderColor: '#11cb5f',
    },
  },
  focused: {},
  notchedOutline: {},
}));

export default function NewPassword() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [{ user }, dispatch] = useStoreContext();
  const [notMatching, setNotMatching] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [values, setValues] = useState({
    password: '',
    reEnterPassword: '',
    showPassword1: false,
    showPassword2: false,
  });

  const history = useHistory();

  useEffect(() => {
    async function handleAuth() {
      let username = sessionStorage.libraryOfStories_user;
      let session = sessionStorage.libraryOfStories_session;
      if (username) {
        await fetchJSON('/api/authentication', 'POST', {
          username: username,
          session: session,
          type: 'checkAuth',
        });
        const res = await fetchJSON(`/api/authentication/${username}`);
        if (res.message === true) {
          dispatch({
            type: 'SET',
            data: { userLoggedIn: true, user: username },
          });
        } else {
          history.push('/login');
        }
      } else {
        history.push('/login');
      }
    }
    handleAuth();
  }, []);

  const handleClickShowPassword = (option) => {
    if (option === 'first') {
      setValues({
        ...values,
        showPassword1: !values.showPassword1,
      });
    }
    if (option === 'second') {
      setValues({
        ...values,
        showPassword2: !values.showPassword2,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleNewPassword = async () => {
    if (
      values.password === values.reEnterPassword &&
      values.password.length > 0 &&
      values.reEnterPassword.length > 0
    ) {
      const data = {
        username: user,
        password: values.password,
      };
      const res = await fetchJSON('/api/newpassword', 'PUT', data);
      if (res.message === 'New password updated') {
        history.push('/browse');
      }
    } else if (
      values.password.length < 1 ||
      values.reEnterPassword.length < 1
    ) {
      setEnterPassword(true);
      setTimeout(() => setEnterPassword(false), 4500);
    } else {
      setNotMatching(true);
      setTimeout(() => setNotMatching(false), 4500);
    }
  };
  return (
    <>
      <Navbar />
      <div className='new-password-wrapper'>
        <h3
          style={{
            opacity: notMatching || enterPassword ? '1' : '0',
            animation:
              notMatching || enterPassword
                ? 'animate 1.5s linear infinite'
                : 'none',
          }}
        >
          {enterPassword ? 'Enter password' : 'Passwords not identical'}
        </h3>
        <FormControl variant='outlined' className='new-password-form'>
          <InputLabel
            htmlFor='outlined-adornment-input'
            className={classes.root}
          >
            New Password
          </InputLabel>
          <OutlinedInput
            color='secondary'
            classes={outlinedInputClasses}
            id='outlined-adornment-input'
            type={values.showPassword1 ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => handleClickShowPassword('first')}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword1 ? (
                    <MdVisibility style={{ color: '#11cb5f' }} />
                  ) : (
                    <MdVisibilityOff style={{ color: '#11cb5f' }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={112}
          />{' '}
        </FormControl>
        <FormControl variant='outlined' className='new-password-form'>
          <InputLabel
            htmlFor='outlined-adornment-input'
            className={classes.root}
          >
            Re-enter Password
          </InputLabel>
          <OutlinedInput
            color='secondary'
            classes={outlinedInputClasses}
            id='outlined-adornment-input'
            type={values.showPassword2 ? 'text' : 'password'}
            value={values.reEnterPassword}
            onChange={handleChange('reEnterPassword')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => handleClickShowPassword('second')}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword2 ? (
                    <MdVisibility style={{ color: '#11cb5f' }} />
                  ) : (
                    <MdVisibilityOff style={{ color: '#11cb5f' }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={142}
          />{' '}
        </FormControl>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleNewPassword}
        >
          <div className='login-btn-text'>ENTER</div>
        </Button>
      </div>
    </>
  );
}

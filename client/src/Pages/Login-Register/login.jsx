import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UsernamePassword from '../../Components/Username-Password/usernamePassword';
import Button from '@material-ui/core/Button';
import Navbar from '../../Components/Navbar/navbar';

import { useStoreContext } from '../../utils/GlobalStore';
import fetchJSON from '../../utils/API';

import './login-register.css';

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

export default function Login() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [_, dispatch] = useStoreContext();
  const [wrongUsernameOrPassword, setWrongUsernameOrPassword] = useState(false);
  const [values, setValues] = useState({
    username: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  async function handleLogin() {
    const data = {
      username: values.username.toLowerCase().trim(),
      password: values.password,
      type: 'auth-password',
    };
    const res = await fetchJSON('/api/login', 'POST', data);
    if (res.message === 'Auth successful') {
      sessionStorage.libraryOfStories_user = res.username;
      sessionStorage.libraryOfStories_session = res.session;
      dispatch({
        type: 'SET',
        data: { userLoggedIn: true, user: res.username },
      });
      history.push('/browse');
    } else {
      setWrongUsernameOrPassword(true);
      setTimeout(() => setWrongUsernameOrPassword(false), 4500);
    }
  }

  return (
    <>
      {' '}
      <Navbar />
      <div className='login-wrapper'>
        <div className='login-message'>
          <span>Welcome to</span>
          <span>Library of Stories</span>
        </div>
        <div className='login-register-box'>
          <h3
            style={{
              opacity: wrongUsernameOrPassword ? '1' : '0',
              animation: wrongUsernameOrPassword
                ? 'animate 1.5s linear infinite'
                : 'none',
            }}
          >
            Wrong username or password
          </h3>
          <div className='login-header'>
            <Link to='/security-question' className='forgot-password-link'>
              Forgot password
            </Link>
          </div>
          <UsernamePassword
            classes={classes}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
          />

          <Button variant='contained' color='secondary' onClick={handleLogin}>
            <div className='login-btn-text'>ENTER</div>
          </Button>
        </div>
      </div>{' '}
    </>
  );
}

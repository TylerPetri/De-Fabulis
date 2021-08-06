import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Username from '../../Components/Forms/username';
import Password from '../../Components/Forms/password';
import SubmitAnimationButton from '../../Components/Buttons/submitLoad';

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
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorHasOccurred, setErrorHasOccurred] = useState(false);
  const [values, setValues] = useState({
    username: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword1: false,
  });
  const history = useHistory();

  async function handleLogin() {
    const data = {
      username: values.username.toLowerCase().trim(),
      password: values.password,
      type: 'auth-password',
    };
    setLoadingAnimation(true);
    const res = await fetchJSON('/api/login', 'POST', data);
    if (res.message) {
      setLoadingAnimation(false);
    }
    if (res.message === 'Auth successful') {
      sessionStorage.libraryOfStories_user = res.username;
      sessionStorage.libraryOfStories_session = res.session;
      dispatch({
        type: 'SET',
        data: { userLoggedIn: true, user: res.username },
      });
      history.push('/browse');
    } else if (res.message === 'Error has occurred') {
      setErrorHasOccurred(true);
    } else {
      setWrongUsernameOrPassword(true);
      setTimeout(() => setWrongUsernameOrPassword(false), 4500);
    }
  }

  return (
    <>
      {' '}
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
          <Username
            classes={classes}
            label={'Username'}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            setValues={setValues}
            width={75}
          />
          <Password
            classes={classes}
            label={'Password'}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            value={values.password}
            setValues={setValues}
            changeParam={'password'}
            clickParam={'first'}
            clickShow={values.showPassword1}
            width={72}
          />
          <SubmitAnimationButton
            function={handleLogin}
            loadingAnimation={loadingAnimation}
            class={'login-btn-text'}
            errorHasOccurred={errorHasOccurred}
            setErrorHasOccurred={setErrorHasOccurred}
          />
        </div>
      </div>{' '}
    </>
  );
}

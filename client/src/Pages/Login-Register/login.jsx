import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UsernamePassword from '../../Components/Username-Password/usernamePassword';
import Button from '@material-ui/core/Button';
import Navbar from '../../Components/Navbar/navbar';

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
    };
    const res = await fetchJSON('/api/login', 'POST', data);
    if (res.message === 'Auth successful') {
      setValues({
        username: '',
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      history.push('/browse');
    } else {
      setWrongUsernameOrPassword(true);
      setTimeout(() => setWrongUsernameOrPassword(false), 2000);
    }
  }

  return (
    <>
      {' '}
      <Navbar />
      <div className='login-wrapper'>
        <div className='login-register-message'>
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

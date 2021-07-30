import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UsernamePassword from '../../Components/Username-Password/usernamePassword';
import Button from '@material-ui/core/Button';

import Navbar from '../../Components/Navbar/navbar';

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
  const [values, setValues] = useState({
    username: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
          <UsernamePassword
            classes={classes}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
          />

          <Button variant='contained' color='secondary'>
            <div className='login-btn-text'>ENTER</div>
          </Button>
        </div>
      </div>{' '}
    </>
  );
}

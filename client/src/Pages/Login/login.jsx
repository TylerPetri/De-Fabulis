import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Navbar from '../../Components/Navbar/navbar';

import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

import './login.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#11cb5f',
    },
    secondary: {
      main: '#651fff',
    },
  },
});

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

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {' '}
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className='login-wrapper'>
          <div className='login-message'>
            <span>Welcome to</span>
            <span>Library of Stories</span>
          </div>
          <div className='login-box'>
            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='outlined-adornment-username'
                className={classes.root}
              >
                Username
              </InputLabel>
              <OutlinedInput
                color='secondary'
                classes={outlinedInputClasses}
                id='outlined-adornment-username'
                value={values.username}
                onChange={handleChange('username')}
                labelWidth={70}
              />{' '}
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='outlined-adornment-password'
                className={classes.root}
              >
                Password
              </InputLabel>
              <OutlinedInput
                color='secondary'
                classes={outlinedInputClasses}
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? (
                        <MdVisibility style={{ color: '#11cb5f' }} />
                      ) : (
                        <MdVisibilityOff style={{ color: '#11cb5f' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />{' '}
            </FormControl>

            <Button variant='contained' color='secondary'>
              <div className='login-btn-text'>ENTER</div>
            </Button>
          </div>
        </div>{' '}
      </ThemeProvider>
    </>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UsernamePassword from '../../Components/Username-Password/usernamePassword';
import SecurityQuestion from '../../Components/Security-Question/securityQuestion';

import Navbar from '../../Components/Navbar/navbar';
import SubmitAnimationButton from '../../Components/Submit-Loading-Animation/submitLoad';
import fetchJSON from '../../utils/API';

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

export default function Register() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorHasOccurred, setErrorHasOccurred] = useState(false);
  const [values, setValues] = useState({
    username: '',
    securityQuestion: '',
    securityAnswer: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showSecurityAnswer: false,
  });
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  async function handleRegister() {
    if (
      values.username.length > 0 &&
      values.password.length > 0 &&
      values.securityQuestion.length > 0 &&
      values.securityAnswer.length > 0
    ) {
      const data = {
        username: values.username.toLowerCase().trim(),
        password: values.password,
        securityQuestion: values.securityQuestion,
        securityAnswer: values.securityAnswer,
      };
      setLoadingAnimation(true);
      const res = await fetchJSON('/api/register', 'POST', data);
      if (res.message) setLoadingAnimation(false);
      if (res.message === 'Added item') {
        history.push('/login');
      } else if (res.message === 'Error has occurred') {
        setErrorHasOccurred(true);
      } else {
        setUsernameTaken(true);
        setTimeout(() => setUsernameTaken(false), 4500);
      }
    } else {
      setAllFieldsRequired(true);
      setTimeout(() => setAllFieldsRequired(false), 4500);
    }
  }

  return (
    <>
      {' '}
      <Navbar />
      <div className='login-wrapper'>
        <div className='register-message'>
          <span>Welcome to</span>
          <span>Library of Stories</span>
        </div>
        <div className='login-register-box'>
          <h3
            style={{
              opacity: allFieldsRequired || usernameTaken ? '1' : '0',
              animation:
                allFieldsRequired || usernameTaken
                  ? 'animate 1.5s linear infinite'
                  : 'none',
            }}
          >
            {allFieldsRequired
              ? 'All fields required'
              : usernameTaken
              ? 'Username taken'
              : ''}
          </h3>
          <UsernamePassword
            classes={classes}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
          />
          <SecurityQuestion
            classes={classes}
            outlinedInputClasses={outlinedInputClasses}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
          />
          <SubmitAnimationButton
            function={handleRegister}
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

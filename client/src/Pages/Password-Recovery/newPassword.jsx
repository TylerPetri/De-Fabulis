import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../Components/Navbar/navbar';
import Password from '../../Components/Forms/password';
import SubmitAnimationButton from '../../Components/Buttons/submitLoad';
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
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorHasOccurred, setErrorHasOccurred] = useState(false);
  const [values, setValues] = useState({
    password: '',
    reEnterPassword: '',
    showPassword1: false,
    showPassword2: false,
  });

  const history = useHistory();

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
      setLoadingAnimation(true);
      await handleAuth();
      const res = await fetchJSON('/api/newpassword', 'PUT', data);
      if (res.message) setLoadingAnimation(false);
      if (res.message === 'New password updated') {
        history.push('/browse');
      } else if (res.message === 'Error has occurred') {
        setErrorHasOccurred(true);
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
        <Password
          classes={classes}
          label={'New Password'}
          outlinedInputClasses={outlinedInputClasses}
          values={values}
          value={values.password}
          setValues={setValues}
          changeParam={'password'}
          clickParam={'first'}
          clickShow={values.showPassword1}
          width={112}
        />
        <Password
          classes={classes}
          label={'Re-enter Password'}
          outlinedInputClasses={outlinedInputClasses}
          values={values}
          value={values.reEnterPassword}
          setValues={setValues}
          changeParam={'reEnterPassword'}
          clickParam={'second'}
          clickShow={values.showPassword2}
          width={142}
        />
        <SubmitAnimationButton
          function={handleNewPassword}
          loadingAnimation={loadingAnimation}
          class={'login-btn-text'}
          errorHasOccurred={errorHasOccurred}
          setErrorHasOccurred={setErrorHasOccurred}
        />
      </div>
    </>
  );
}

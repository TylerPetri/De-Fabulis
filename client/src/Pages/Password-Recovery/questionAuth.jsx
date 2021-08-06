import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import SubmitAnimationButton from '../../Components/Buttons/submitLoad';
import Username from '../../Components/Forms/username';
import Answer from '../../Components/Forms/securityAnswer';

import fetchJSON from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalStore';

import './passwordRecovery.css';

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

export default function PasswordRecovery() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [_, dispatch] = useStoreContext();
  const [identified, setIdentified] = useState(false);
  const [noSuchBeing, setNoSuchBeing] = useState(false);
  const [enterUsername, setEnterUsername] = useState(false);
  const [enterAnswer, setEnterAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorHasOccurred, setErrorHasOccurred] = useState(false);
  const [values, setValues] = useState({
    username: '',
    securityQuestion: '',
    securityAnswer: '',
    showSecurityAnswer: false,
  });

  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  async function searchOne() {
    if (values.username.length > 0) {
      setLoadingAnimation(true);
      const res = await fetchJSON(`/api/searchOne/${values.username}`);
      if (res.message) setLoadingAnimation(false);
      if (res.message === 'No such being') {
        setNoSuchBeing(true);
        setTimeout(() => setNoSuchBeing(false), 4500);
      } else if (res.message === 'Error has occurred') {
        setErrorHasOccurred(true);
      } else if (res.message === 'Found one') {
        setValues({
          ...values,
          securityQuestion: res.data.securityQuestion,
        });
        setIdentified(true);
      }
    } else {
      setEnterUsername(true);
      setTimeout(() => setEnterUsername(false), 4500);
    }
  }

  async function authenticateAnswer() {
    if (values.securityAnswer.length > 0) {
      const data = {
        username: values.username,
        answer: values.securityAnswer,
        type: 'auth-answer',
      };
      setLoadingAnimation(true);
      const res = await fetchJSON('/api/login', 'POST', data);
      if (res.message) setLoadingAnimation(false);
      if (res.message === 'Auth successful') {
        sessionStorage.libraryOfStories_user = res.username;
        sessionStorage.libraryOfStories_session = res.session;
        dispatch({
          type: 'SET',
          data: { userLoggedIn: true, user: res.username },
        });
        history.push('/new-password');
      } else {
        setWrongAnswer(true);
        setTimeout(() => setWrongAnswer(false), 4500);
      }
    } else {
      setEnterAnswer(true);
      setTimeout(() => setEnterAnswer(false), 4500);
    }
  }

  return (
    <>
      <div className='recovery-wrapper'>
        {!identified ? (
          <div className='username-recovery'>
            <h3
              style={{
                opacity: noSuchBeing || enterUsername ? '1' : '0',
                animation:
                  noSuchBeing || enterUsername
                    ? 'animate 1.5s linear infinite'
                    : 'none',
              }}
            >
              {enterUsername ? 'Enter username' : 'No such being'}
            </h3>
            <Username
              classes={classes}
              outlinedInputClasses={outlinedInputClasses}
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              width={75}
            />
            <SubmitAnimationButton
              function={searchOne}
              loadingAnimation={loadingAnimation}
              class={'login-btn-text'}
              errorHasOccurred={errorHasOccurred}
              setErrorHasOccurred={setErrorHasOccurred}
            />
          </div>
        ) : (
          <div className='question-recovery'>
            <h3
              style={{
                opacity: wrongAnswer || enterAnswer ? '1' : '0',
                animation:
                  wrongAnswer || enterAnswer
                    ? 'animate 1.5s linear infinite'
                    : 'none',
              }}
            >
              {enterAnswer ? 'Enter answer' : 'Wrong answer'}
            </h3>
            <div className='security-question'>{values.securityQuestion}</div>
            <Answer
              classes={classes}
              outlinedInputClasses={outlinedInputClasses}
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              width={54}
            />
            <SubmitAnimationButton
              function={authenticateAnswer}
              loadingAnimation={loadingAnimation}
              class={'login-btn-text'}
              errorHasOccurred={errorHasOccurred}
              setErrorHasOccurred={setErrorHasOccurred}
            />
          </div>
        )}
      </div>
    </>
  );
}

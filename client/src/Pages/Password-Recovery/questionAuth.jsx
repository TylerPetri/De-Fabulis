import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import Navbar from '../../Components/Navbar/navbar';

import './passwordRecovery.css';
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

export default function PasswordRecovery() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [_, dispatch] = useStoreContext();
  const [identified, setIdentified] = useState(false);
  const [noSuchBeing, setNoSuchBeing] = useState(false);
  const [enterUsername, setEnterUsername] = useState(false);
  const [enterAnswer, setEnterAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showSecurityAnswer: !values.showSecurityAnswer,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function searchOne() {
    if (values.username.length > 0) {
      const res = await fetchJSON(`/api/searchOne/${values.username}`);

      if (res.message === 'No such being') {
        setNoSuchBeing(true);
        setTimeout(() => setNoSuchBeing(false), 4500);
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

      const res = await fetchJSON('/api/login', 'POST', data);
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
      <Navbar />
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
            <FormControl variant='outlined' className='username-recovery-form'>
              <InputLabel
                htmlFor='outlined-adornment-input-recovery'
                className={classes.root}
              >
                Username
              </InputLabel>
              <OutlinedInput
                color='secondary'
                classes={outlinedInputClasses}
                id='outlined-adornment-input-recovery'
                value={values.username}
                onChange={handleChange('username')}
                labelWidth={75}
              />{' '}
            </FormControl>
            <Button variant='contained' color='secondary' onClick={searchOne}>
              <div className='recovery-submit-btn'>ENTER</div>
            </Button>
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
            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='outlined-adornment-input'
                className={classes.root}
              >
                Answer
              </InputLabel>
              <OutlinedInput
                color='secondary'
                classes={outlinedInputClasses}
                id='outlined-adornment-input'
                type={values.showSecurityAnswer ? 'text' : 'password'}
                value={values.securityAnswer}
                onChange={handleChange('securityAnswer')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle securityAnswer visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showSecurityAnswer ? (
                        <MdVisibility style={{ color: '#11cb5f' }} />
                      ) : (
                        <MdVisibilityOff style={{ color: '#11cb5f' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={54}
              />{' '}
            </FormControl>
            <Button
              variant='contained'
              color='secondary'
              onClick={authenticateAnswer}
            >
              <div className='recovery-submit-btn'>ENTER</div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

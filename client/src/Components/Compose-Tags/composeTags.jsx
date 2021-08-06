import { useStoreContext } from '../../utils/GlobalStore';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import './composeTags.css';

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

export default function AddTags() {
  const [{ currentTags }, dispatch] = useStoreContext();
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      addTag(event.target.value, event);
    }
  }

  function addTag(tag, event) {
    if (!currentTags.includes(tag)) {
      dispatch({
        type: 'SET',
        data: {
          currentTags: [...currentTags, tag],
        },
      });
      event.target.value = '';
    } else {
      let children =
        event.target.parentNode.parentNode.parentNode.children[1].children;

      for (let i = 0; i < children.length; i++) {
        if (children[i].outerText === tag) children[i].id = 'alert';
        setTimeout(() => (children[i].id = ''), 2000);
      }
    }
  }

  function removeTag(idx) {
    const temp = currentTags;
    const remove = temp.splice(idx, 1);
    const filter = temp.filter((a) => a !== remove);

    dispatch({
      type: 'SET',
      data: { currentTags: filter },
    });
  }

  return (
    <>
      <div className='compose-tags-container'>
        <FormControl variant='outlined' id='add-tags-input'>
          <InputLabel
            htmlFor='outlined-adornment-input'
            className={classes.root}
          >
            Tags
          </InputLabel>
          <OutlinedInput
            color='secondary'
            classes={outlinedInputClasses}
            spellCheck='false'
            id='outlined-adornment-input'
            onKeyPress={(event) => handleKeyPress(event)}
            labelWidth={35}
          />{' '}
        </FormControl>
        <div className='compose-tags-box'>
          {currentTags.length > 0 &&
            currentTags.map((tag, idx) => (
              <div
                className='compose-tags'
                key={idx}
                onClick={() => removeTag(idx)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

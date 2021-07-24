import { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalStore';

import './textarea.css';

export default function CompTextArea() {
  const [{ openEdit, currentStory }, dispatch] = useStoreContext();
  const [colors] = useState([
    'rgb(185, 0, 0)',
    'orange',
    'yellow',
    'green',
    'lightBlue',
    'rgb(0, 0, 160)',
    'purple',
    'pink',
    'rgb(121, 80, 28)',
    'black',
    'grey',
    'white',
  ]);

  const [settings, setSettings] = useState(currentStory.settings);

  async function toggleDropdown(id) {
    !settings[id].dropdown
      ? setSettings([...settings, (settings[id].dropdown = true)])
      : setSettings([...settings, (settings[id].dropdown = false)]);
    setSettings(settings.filter((a) => a !== true || false));
    await dispatch({
      type: 'SET_STORY_SETTINGS',
      data: { currentStory: settings },
    });
  }

  function setColor(id, color) {
    setSettings([...settings, (settings[id].color = color)]);
  }

  function chooseColor(ele) {
    const mode = ele.target.parentNode.id;
    const color = ele.target.id;
    let selectedColor = '';
    let bg = 1;

    mode === 'Background' ? (bg = 0.4) : (bg = 1);

    switch (color) {
      case 'rgb(185, 0, 0)':
        selectedColor = `RGBA(185, 0, 0, ${bg})`;
        break;
      case 'orange':
        selectedColor = `RGBA(255, 165, 0, ${bg})`;
        break;
      case 'yellow':
        selectedColor = `RGBA(255, 255, 0, ${bg})`;
        break;
      case 'green':
        selectedColor = `RGBA(0, 185, 0, ${bg})`;
        break;
      case 'lightBlue':
        selectedColor = `RGBA(173, 216, 230, ${bg})`;
        break;
      case 'rgb(0, 0, 160)':
        selectedColor = `RGBA(0, 0, 160, ${bg})`;
        break;
      case 'purple':
        selectedColor = `RGBA(128, 0, 128, ${bg})`;
        break;
      case 'pink':
        selectedColor = `RGBA(255, 192, 203, ${bg})`;
        break;
      case 'rgb(121, 80, 28)':
        selectedColor = `RGBA(121, 80, 28, ${bg})`;
        break;
      case 'black':
        selectedColor = `RGBA(0, 0, 0, ${bg})`;
        break;
      case 'grey':
        selectedColor = `RGBA(128, 128, 128, ${bg})`;
        break;
      case 'white':
        selectedColor = `RGBA(255, 255, 255, ${bg})`;
        break;
      default:
        break;
    }
    if (mode === 'Font') {
      setColor(0, selectedColor);
      toggleDropdown(0);
    }
    if (mode === 'Text-background') {
      setColor(1, selectedColor);
      toggleDropdown(1);
    }
    if (mode === 'Background') {
      setColor(2, selectedColor);
      toggleDropdown(2);
    }
  }

  function closeEdit() {
    dispatch({ type: 'CLOSE_EDIT' });
  }

  return (
    <>
      <div
        className='edit-compose-container'
        style={{
          opacity: openEdit ? '1' : '0',
          zIndex: openEdit ? '10' : '-1',
          backgroundColor: settings[2].color,
        }}
      >
        <div className='edit-compose-card'>
          <div className='edit-options-cont'>
            <ul>
              {settings.map((a, idx) => (
                <li key={idx}>
                  <div className='edit-options'>
                    <h4>{a.option}</h4>
                    <button
                      className='edit-color-button'
                      style={{ backgroundColor: a.color }}
                      onClick={() => toggleDropdown(idx)}
                    ></button>
                    <div
                      className='color-dropdown'
                      style={{ display: a.dropdown ? 'grid' : 'none' }}
                      id={a.option}
                    >
                      {colors.map((b) => (
                        <button
                          key={b}
                          className='edit-color-button'
                          id={b}
                          style={{ backgroundColor: b }}
                          onClick={(ele) => chooseColor(ele)}
                        ></button>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='edit-compose-saveExit-cont'>
              <div className='edit-compose-save'>Save</div>
              <span className='vertical-line-span'>|</span>
              <div className='edit-compose-exit' onClick={closeEdit}>
                Exit
              </div>
            </div>
          </div>
          <textarea
            name='edit-compose-area'
            placeholder='Compose here'
            className='edit-compose-area'
            style={{
              color: settings[0].color,
              backgroundColor: settings[1].color,
            }}
          />
        </div>
      </div>
    </>
  );
}

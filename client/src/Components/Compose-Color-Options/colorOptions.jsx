import { useState } from 'react';

import './colorOptions.css';

export default function ColorOptions(props) {
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

  function toggleDropdown(id) {
    !props.settings[id].dropdown
      ? props.setSettings([
          ...props.settings,
          (props.settings[id].dropdown = true),
        ])
      : props.setSettings([
          ...props.settings,
          (props.settings[id].dropdown = false),
        ]);
    props.setSettings(props.settings.filter((a) => a !== true || false));
  }

  function setColor(id, color) {
    props.setSettings([...props.settings, (props.settings[id].color = color)]);
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

  return (
    <ul>
      {props.settings.map((a, idx) => (
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
  );
}

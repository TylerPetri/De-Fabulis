import { useState } from 'react';

import './colorOptions.css';

export default function ColorOptions(props) {
  const [colors] = useState([
    'rgb(244,67,54)',
    'rgb(255,152,0)',
    'rgb(255, 235, 59)',
    'rgb(0,230,118)',
    'rgb(0,176,255)',
    'rgb(41,121,255)',
    'rgb(156,39,176)',
    'rgb(216, 22, 138)',
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

    mode === 'Background' ? (bg = 0.6) : (bg = 1);

    switch (color) {
      case 'rgb(244,67,54)':
        selectedColor = `RGBA(244,67,54, ${bg})`;
        break;
      case 'rgb(255,152,0)':
        selectedColor = `RGBA(255,152,0, ${bg})`;
        break;
      case 'rgb(255, 235, 59)':
        selectedColor = `RGBA(255, 235, 59, ${bg})`;
        break;
      case 'rgb(0,230,118)':
        selectedColor = `RGBA(0,230,118, ${bg})`;
        break;
      case 'rgb(0,176,255)':
        selectedColor = `RGBA(0,176,255, ${bg})`;
        break;
      case 'rgb(41,121,255)':
        selectedColor = `RGBA(41,121,255, ${bg})`;
        break;
      case 'rgb(156,39,176)':
        selectedColor = `RGBA(156,39,176, ${bg})`;
        break;
      case 'rgb(216, 22, 138)':
        selectedColor = `RGBA(216, 22, 138, ${bg})`;
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
              className={
                props.sidenav ? 'color-dropdown-nav' : 'color-dropdown'
              }
              style={{ display: a.dropdown ? 'grid' : 'none' }}
              id={a.option}
            >
              {colors.map((b) => (
                <button
                  key={b}
                  className='edit-color-button'
                  id={b}
                  style={{
                    backgroundColor: b,
                    opacity: a.option === 'Background' ? '0.6' : '1',
                  }}
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

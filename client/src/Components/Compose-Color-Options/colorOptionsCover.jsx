import { switchCase, setColor, toggleDropdown } from './colorOptionsFunctions';
import { useStoreContext } from '../../utils/GlobalStore';

import './colorOptions.css';

export default function ColorOptions(props) {
  const [{ colors }] = useStoreContext();

  function chooseColor(ele) {
    const mode = ele.target.parentNode.id;
    const color = ele.target.id;

    if (mode === 'Font') {
      setColor(0, switchCase(mode, color), props);
      toggleDropdown(0, props.settings, props.setSettings);
    }
    if (mode === 'Cover-Background') {
      setColor(1, switchCase(mode, color), props);
      toggleDropdown(1, props.settings, props.setSettings);
    }
    if (mode === 'Title-Font') {
      setColor(2, switchCase(mode, color), props);
      toggleDropdown(2, props.settings, props.setSettings);
    }
    if (mode === 'Title-Background') {
      setColor(3, switchCase(mode, color), props);
      toggleDropdown(3, props.settings, props.setSettings);
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
              onClick={() => toggleDropdown(idx, props)}
            ></button>
            <div
              className='color-dropdown-cover'
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

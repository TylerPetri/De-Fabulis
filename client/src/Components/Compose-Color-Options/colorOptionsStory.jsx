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
      toggleDropdown(0);
    }
    if (mode === 'Text-background') {
      setColor(1, switchCase(mode, color), props);
      toggleDropdown(1);
    }
    if (mode === 'Background') {
      setColor(2, switchCase(mode, color), props);
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
              onClick={() => toggleDropdown(idx, props)}
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

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './alphabetical-pagenation.css';

export default function AlphPage(props) {
  const [letters] = useState([
    '#',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]);
  const history = useHistory();

  function filterList(page, option) {
    if (option === '#') {
      history.push(`${page}`);
    } else {
      history.push(`${page}?filter=${option}`);
    }
  }

  return (
    <ul className='alphabetical-pagenation'>
      {letters.map((letter) => (
        <li key={letter} onClick={() => filterList(props.page, letter)}>
          {letter}
        </li>
      ))}
    </ul>
  );
}

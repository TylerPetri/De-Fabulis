const switchCase = (mode, color) => {
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
  return selectedColor;
};

const setColor = (id, color, settings, setSettings) => {
  setSettings([...settings, (settings[id].color = color)]);
};

const toggleDropdown = (id, settings, setSettings) => {
  !settings[id].dropdown
    ? setSettings([...settings, (settings[id].dropdown = true)])
    : setSettings([...settings, (settings[id].dropdown = false)]);
  setSettings(settings.filter((a) => a !== true || false));
};

module.exports = { switchCase, setColor, toggleDropdown };

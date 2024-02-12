import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { useDarkModeContext } from '../context/useDarkModeContext';

function DarkModeToggle(): JSX.Element {
  const { toggleMode, isDarkMode } = useDarkModeContext();
  return (
    <ButtonIcon onClick={() => toggleMode()}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

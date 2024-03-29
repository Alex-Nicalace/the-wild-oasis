import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      'DarkModeContext must be used within a DarkModeProvider!!!'
    );
  }
  return context;
}

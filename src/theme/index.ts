import { createTheme, MantineThemeOverride } from '@mantine/core';

function tuple10<T>(value: T): [T, T, T, T, T, T, T, T, T, T] {
  return [value, value, value, value, value, value, value, value, value, value];
}

export const lightTheme: MantineThemeOverride = createTheme({
  fontFamily: 'Arial, Helvetica, sans-serif',
  primaryColor: 'primary',
  colors: {
    background: tuple10('#ffffff'),
    text: tuple10('#171717'),
    primary: tuple10('#0076E6'),
    success: tuple10('#00B377'),
    error: tuple10('#E60000'),
    warning: tuple10('#FFB300'),
  },
});

export const darkTheme: MantineThemeOverride = createTheme({
  fontFamily: 'Arial, Helvetica, sans-serif',
  primaryColor: 'primary',
  colors: {
    background: tuple10('#000000'),
    text: tuple10('#ffffff'),
    primary: tuple10('#0076E6'),
    success: tuple10('#00B377'),
    error: tuple10('#E60000'),
    warning: tuple10('#FFB300'),
  },
});

import { createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'M PLUS Rounded 1c', sans-serif` },
        body: { value: `'M PLUS Rounded 1c', sans-serif` },
      },
      colors: {
        background: {
          light: { value: '#E9f6d0' },
          dark: { value: '#021e2f' },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: {
        _light: 'background.light',
        _dark: 'background.dark',
      },
      
    },
  },
});

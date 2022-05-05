import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  attributify: true,
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
  },
});

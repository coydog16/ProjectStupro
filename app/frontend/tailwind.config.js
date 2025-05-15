/** @type {import('tailwindcss').Config} */
import typographyPlugin from '@tailwindcss/typography';
import formsPlugin from '@tailwindcss/forms';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin, formsPlugin],
}

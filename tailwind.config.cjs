const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      colors: {
        base: colors.gray,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-black': ['Geist-Black', 'sans-serif'],
        'geist-bold': ['Geist-Bold', 'sans-serif'],
        'geist-medium': ['Geist-Medium', 'sans-serif'],
        'geist-regular': ['Geist-Regular', 'sans-serif'],
        'geist-light': ['Geist-Light', 'sans-serif'],
        'geist-thin': ['Geist-Thin', 'sans-serif'],
        'geist-semibold': ['Geist-Semibold', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;

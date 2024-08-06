/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      fontFamily: {
        'sans': ["Inter"],
      },
      colors: {
        'dark-gray': '#1F1F1F',
        'dark-gray-2': '#474747',
        'dark-gray-3': '#666666',
        'light-gray': '#8F8F8F',
        'light-gray-2': '#CCCCCC',
        'light-gray-3': '#F5F5F5',
        'white': '#FFFFFF',
        'primary-1': '#C92071',
        'secondary-1': '#B5B6F2',
        'tertiary': '#991956',
        'error': '#EE4266',
        'success': '#52CA76',
        'warning': '#F6AA1C',
        'primary-2': '#EDABCA',
        'secondary-2': '#EFEFFF',
      },
    },
  },
  plugins: [],
}

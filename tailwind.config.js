module.exports = {
  content: ['./*.html', './*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#151f32',
          950: '#090d16',
        }
      }
    }
  },
  safelist: [],
};

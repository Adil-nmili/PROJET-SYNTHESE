module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this if your files are in different folders
    ],
    theme: {
      extend: {
        keyframes: {
          reveal: {
            '0%': { opacity: '1' },
            '50%': { opacity: '0.5' },
            '100%': { opacity: '0' },
          },
        },
        animation: {
          'reveal': 'reveal 3s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  };
  
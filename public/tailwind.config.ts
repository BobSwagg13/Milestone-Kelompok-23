module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // Matches all files in the app directory
    './components/**/*.{js,ts,jsx,tsx}', // Matches all files in the components directory (if you have one in the future)
    './models/**/*.{js,ts,jsx,tsx}',     // Matches all files in the models directory
    './lib/**/*.{js,ts,jsx,tsx}',        // Matches all files in the lib directory
    './public/**/*.{js,ts,jsx,tsx}',     // Matches all files in the public directory (if using templates)
    './types/**/*.{js,ts,jsx,tsx}',      // Matches all files in the types directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

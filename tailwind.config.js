/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

   theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],  
      },
      colors: {
        cyan:'#128B96',
        cyanHover:'#1E1E1E',
        icyblue:'#F9FEFF',
        fontgrey:'#638588', 
        greenBg:'#CCF1CF',     
      },
        backgroundImage: {
    loginbg: "url('./LoginBg.png')",
  },
        boxShadow: {
        customShadow: "0px 4px 8px 0px #0000001A",
      },

    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens : {
      'md' : '480px'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui : {
    themes : ['dark']
  }
}


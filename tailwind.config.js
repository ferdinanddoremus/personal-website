/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    spacing: {
      ch: '1ch',
      2: '2ch',
      3: '3ch',
      4: '4ch',
      5: '5ch',
      6: '6ch',
      8: '8ch',
    },
    extend: {
      // Character-width based spacing scale
      spacing: {
        'ch': '1ch',
        '2ch': '2ch',
        '3ch': '3ch',
        '4ch': '4ch',
        '5ch': '5ch',
        '6ch': '6ch',
        '8ch': '8ch',
        '10ch': '10ch',
        '12ch': '12ch',
        '16ch': '16ch',
        '20ch': '20ch',
      },
      
      // Character-width based widths
      width: {
        'ch': '1ch',
        '20ch': '20ch',
        '30ch': '30ch',
        '40ch': '40ch',
        '50ch': '50ch',
        '60ch': '60ch',
        '70ch': '70ch',
        '80ch': '80ch',
        '100ch': '100ch',
      },
      
      // Character-width based max widths
      maxWidth: {
        'ch': '1ch',
        '20ch': '20ch',
        '30ch': '30ch',
        '40ch': '40ch',
        '50ch': '50ch',
        '60ch': '60ch',
        '70ch': '70ch',
        '80ch': '80ch',
        '100ch': '100ch',
      },
      
      // Character-width based gaps
      gap: {
        'ch': '1ch',
        '2ch': '2ch',
        '3ch': '3ch',
        '4ch': '4ch',
      },
      
      // Custom font family for Google Sans Code
      fontFamily: {
        'mono': ['Google Sans Code', 'monospace'],
        'sans': ['Google Sans Code', 'monospace'], // Override default sans
      },
      
      // Line height optimized for monospace
      lineHeight: {
        'mono': '1.2',
      },
      
      // Character-width responsive breakpoints
      screens: {
        'ch-sm': '40ch',
        'ch-md': '60ch',
        'ch-lg': '80ch',
        'ch-xl': '100ch',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.space-y-ch > * + *': {
          marginTop: '1ch',
        },
        '.space-y-2ch > * + *': {
          marginTop: '2ch',
        },
        '.space-y-3ch > * + *': {
          marginTop: '3ch',
        },
      })
    }
  ],
}
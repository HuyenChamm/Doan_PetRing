module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      body: ['Manrope', 'sans-serif'],
      clim: ['Climate Crisis', 'cursive'],
      os: ['Oswald', 'sans-serif'],
      poppins:['Poppins', 'sans-serif'],
    },
    screens:{
      'sm': '375px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1440px',
      '3xl': '1800px',
      '2k': '2000px',
      'down_2xl': {'max': '1439px'},
      'down_xl': {'max': '1199px'},
      'down_lg': {'max': '991px'},
      'down_md': {'max': '767px'},
      'down_sm': {'max': '375px'},
    },

    extend: {
      spacing: {
        '75': '75px',
        '98': '98px',
        '120': '120px',
        '550': '550px',
        '664': '664px',
        '800': '800px',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '73p': '73%',
        '90p': '90%',
        '7vw': '7vw',
        '13vw': '13vw',
        '10000vh': '10000vh',
      },
      maxWidth: {
        '800': '800px',
      },
      minHeight: {
        '664': '664px',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          '@screen md': {
            paddingLeft: '48px',
            paddingRight: '48px',
          },
          '@screen xl': {
            maxWidth: '1232px',
          },
          '@screen 2xl': {
            maxWidth: '1340px',
          },
          '@screen 3xl': {
            maxWidth: '1600px',
          },
        },
      })
    }
  ],
}
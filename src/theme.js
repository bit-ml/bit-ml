export const theme = {
  colors: {
    background: '#f5f2f2', // lightly tinted white
    tintedBackground: '#EDEBEB', // for panels, widgets, etc.
    highContrast: '#333', // almost black
    midContrast: '#828282', // darker grey
    lowContrast: '#c6bebe',
    brandRed: '#e6212b', // red
  },
  fonts: {
    title: '"Exo 2", sans-serif',
    body: '"Roboto", Helvetica, Arial, sans-serif',
  },
  fontSizes: [
    '0.579rem',
    '0.694rem',
    '0.833rem',
    '1.00rem',
    '1.20rem',
    '1.44rem',
    '1.728rem',
    '2.074rem',
    '2.488rem',
  ],
  fontWeights: [300, 400, 500, 600],
  lineHeights: {
    tiny: '1.00rem',
    small: '1.48rem',
    copy: '1.78947rem',
    mobileTitle: '2.074rem',
    title: '3.57895rem',
  },
  breakpoints: {
    mobile: 0,
    tablet: 737,
    desktop: 1195,
  },
  space: [
    0,
    '1.78947rem',
    '3.57895rem',
    '4px',
    '8px',
    '16px',
    '32px',
    '64px',
    '128px',
    '256px',
    '512px',
  ],
  borders: [0, '1px solid', '2px solid', '4px solid', '8px solid'],
  radii: [0, '3px', '5px', '8px'],
  sizes: [
    '16px',
    '32px',
    '64px',
    '128px',
    '256px',
    '512px',
    '768px',
    '1024px',
    '1536px',
  ],
}

theme.fontWeights.bodyNormal = theme.fontWeights[0]
theme.fontWeights.bodyMedium = theme.fontWeights[1]
theme.fontWeights.bodyBold = theme.fontWeights[2]
theme.fontWeights.titleNormal = theme.fontWeights[1]
theme.fontWeights.titleSemi = theme.fontWeights[3]

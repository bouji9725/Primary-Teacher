// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {

            main: '#6a9692ff',
        },
        secondary: {
            // accent lilac
            main: '#C39AF5',
        },
        background: {
            default: '#f3ddddff', // page background (beige)
            paper: '#FFFFFF',

        },
        text: {
            primary: '#2F2A3B',    // dark, slightly warm
            secondary: '#675B7C',  // muted purple/grey
        },
    },
    typography: {
        fontFamily:
            '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.8rem',
            lineHeight: 1.1,
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.2rem',
            lineHeight: 1.2,
            textAlign: 'center',

        },
        h3: {
            fontWeight: 600,
            fontSize: '1.6rem',
            lineHeight: 1.3,
            textAlign: 'center',

        },
        body1: {
            fontSize: '1.2rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 18,
    },
    components: {
        // You can add component overrides later if needed
    },
});

const gradients = {
    primarygradient: 'linear-gradient(120deg, #8F7AE5 0%, #C39AF5 40%, #F4E7DA 100%)',
    bgsecondary: 'linear-gradient(135deg, #FFE8E2 0%, #FFF1EC 40%, #FFF8F5 100%)',
    bgmain: 'linear-gradient(135deg, #f3ddddff 0%, #F0E4FF 40%, #F9F5EF 100%)',
    sidebar: 'linear-gradient(180deg, #8F7AE5 0%, #6F5AE0 100%)',
    cta: 'linear-gradient(35deg, #a6dbf0ff 0%, #ee8ae6ff 40%, #F9F5EF 100%)',
    card: 'radial-gradient(circle at center, #c39af5ff 0%, #f3ddddff 1%, #F4E7DA 100%)',
    linetobottom: `linear-gradient(
  to bottom,
  #8F7AE5 0%,
  #8f7ae5 40%,
  #f4e7da 60%,
  #F4E7DA 100%)`,
    navbarline: `linear-gradient(
  to bottom,
  #8C6F7F 0%,
  #8C6F7F 2%,
  #f3ddddff 60%,
  #f3ddddff 100%)`,


};

export default theme;
export { gradients };

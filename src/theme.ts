// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const layout = {
    heroTop: { xs: 12, sm: 14, md: 16 },
    sectionY: { xs: 8, md: 10 },
    pageBottom: { xs: 8, sm: 10, md: 12 },
    container: {
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: {
            xs: '100%',
            sm: '640px',
            md: '860px',
            lg: '1180px',
            xl: '1420px',
        },
        mx: 'auto',
    },
} as const;

const theme = createTheme({
    palette: {
        primary: {
            main: '#6a9692ff',
        },
        secondary: {
            main: '#C39AF5',
        },
        background: {
            default: '#f3ddddff',
            paper: '#FFFFFF',

        },
        text: {
            primary: '#2F2A3B',
            secondary: '#675B7C',
        },
    },
    typography: {
        fontFamily:
            '"IBM Plex Sans", "Segoe UI", system-ui, -apple-system, sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: 1.2,
            textAlign: 'center',

        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.25,
            textAlign: 'center',

        },
        h4: {
            fontWeight: 600,
            fontSize: '1.35rem',
            lineHeight: 1.3,
        },
        body1: {
            fontSize: '1.05rem',
            lineHeight: 1.65,
        },
        body2: {
            fontSize: '0.95rem',
            lineHeight: 1.6,
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

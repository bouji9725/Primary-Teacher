'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { gradients } from '../theme';

const pages = ['Home', 'Services', 'Packages', 'Booking', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const pageRoutes: Record<string, string> = {
  Home: '/',
  Services: '/Services',
  Packages: '/Packages',
  Booking: '/Booking',
  About: '/about',
};

const NavBar: React.FC = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Scroll progress (0 → 1)
  const [scrollProgress, setScrollProgress] = React.useState(0);
  // For bold text + color change
  const [scrolled, setScrolled] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (page: string) => {
    const route = pageRoutes[page] ?? '/';
    router.push(route);
    setDrawerOpen(false);
  };

  React.useEffect(() => {
    const fadeStart = 0;   // px where fade starts
    const fadeEnd = 200;   // px where fade ends (fully applied)

    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;

      // raw progress from 0 → 1
      const raw = (y - fadeStart) / (fadeEnd - fadeStart);
       const progress = Math.min(Math.max(raw, 0), 1); // ✅ CLAMP 0–1 (NOT 9–5)

      setScrollProgress(progress);

      // bold text after 15% of fade range
      setScrolled(progress > 0.15);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparency range (0 = fully transparent, 1 = solid)
  const minTransparency = 0.05; // opacity at top
  const maxTransparency = 0.50; // opacity after fadeEnd

  const backgroundOpacity =
    minTransparency + scrollProgress * (maxTransparency - minTransparency);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        // Option A (keep gradient):
        backgroundImage: gradients.navbarline,
        backgroundBlendMode: 'overlay',

        // Option B (pure rgba, more obvious transparency):
        // backgroundImage: 'none',

        backgroundColor: `rgba(249, 245, 239, ${backgroundOpacity})`,

        backdropFilter: backgroundOpacity > 0.1 ? 'blur(10px)' : 'none',

        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: 'relative' }}>
          {/* DESKTOP LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#1A1A1A',
              textDecoration: 'none',
            }}
          >
            <Box component="img" 
            src="/2Logo.png" 
            alt="Logo" 
            sx={{ borderRadius: 2, height: 80 , width: 120 }} />
          </Typography>

          {/* MOBILE MENU ICON */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              color= "inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}

            >
              <Box
                sx={{ width: 250 , background: gradients.bgmain, height: '100%' }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {pages.map((page) => (
                    <ListItem key={page} disablePadding>
                      <ListItemButton onClick={() => handleNavigate(page)}>
                        <ListItemText primary={page} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* MOBILE LOGO */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <Box component="img" 
            src="/2Logo.png" 
            alt="Logo" 
            sx={{ borderRadius: 2, height: 80 , width: 80 }} />
            
          </Typography>

          {/* DESKTOP NAV */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: { xs: 'none', lg: 'flex' },
              gap: 4,
            }}
          >
        {pages.map((page) => (
          <Button
        
            key={page}
            onClick={() => handleNavigate(page)}
            sx={{
              fontFamily: 'monospace',
              fontSize: 22,
              letterSpacing: '.3rem',
              my: 2,

              color: scrolled ? '#8C6F7F' : '#49928cff',
              fontWeight: scrolled ? 700 : 400,
              backgroundColor: 'transparent',

              transition: 'color 0.3s ease, font-weight 0.3s ease',

              // Add hover effect
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',  // glassy hover
                // optional: keep text color stable on hover
                color: scrolled ? '#8C6F7F' : '#49928cff',
              },
            }}
          >
            {page}
          </Button>
        ))}
          </Box>

          {/* RIGHT AVATAR */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* USER MENU */}
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                <Typography>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  transition: theme.transitions.create(['background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  '&.MuiAppBar-root': {
    backgroundColor: '#f0f0f0',
    boxShadow: 'none',
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
  '& .MuiTypography-root': {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  '& .MuiButton-root': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '& .MuiIconButton-root': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const NavigationBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMusic = () => {
    router.push('/music');
    handleClose();
  };

  const handleGiveaway = () => {
    router.push('/giveaway');
    handleClose();
  };

  const handlePoll = () => {
    router.push('/poll');
    handleClose();
  };

  const handleModeration = () => {
    router.push('/moderation');
    handleClose();
  };

  const handleRanking = () => {
    router.push('/ranking');
    handleClose();
  };

  const handleUser = () => {
    router.push('/user');
    handleClose();
  };

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push('/');
    handleClose();
  };

  return (
    <CustomAppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Comprehensive Discord Bot
        </Typography>
        {session ? (
          <>
            <Button variant="text" onClick={handleMusic}>
              Music
            </Button>
            <Button variant="text" onClick={handleGiveaway}>
              Giveaway
            </Button>
            <Button variant="text" onClick={handlePoll}>
              Poll
            </Button>
            <Button variant="text" onClick={handleModeration}>
              Moderation
            </Button>
            <Button variant="text" onClick={handleRanking}>
              Ranking
            </Button>
            <Button variant="text" onClick={handleUser}>
              User
            </Button>
            <Button variant="text" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="text" onClick={() => router.push('/')}>
            Login
          </Button>
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMusic}>Music</MenuItem>
          <MenuItem onClick={handleGiveaway}>Giveaway</MenuItem>
          <MenuItem onClick={handlePoll}>Poll</MenuItem>
          <MenuItem onClick={handleModeration}>Moderation</MenuItem>
          <MenuItem onClick={handleRanking}>Ranking</MenuItem>
          <MenuItem onClick={handleUser}>User</MenuItem>
          {session && <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>}
        </Menu>
      </Toolbar>
    </CustomAppBar>
  );
};

export default NavigationBar;
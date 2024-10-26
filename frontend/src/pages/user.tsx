import { Box, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUpdateUser } from '../utils/apiClient';

const CustomContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const UserSettings = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: updateUser, isLoading, error } = useUpdateUser();

  const [email, setEmail] = useState(session?.user.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(session?.user.role || 'user');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      setRole(session.user.role);
      setIsNotificationsEnabled(session.user.isNotificationsEnabled);
    }
  }, [session]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as 'user' | 'admin');
  };

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUser({
        email,
        password,
        role,
        isNotificationsEnabled,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!session) {
    router.push('/');
  }

  return (
    <CustomContainer maxWidth="sm">
      <CustomTypography variant="h4" align="center">
        User Settings
      </CustomTypography>
      {error && (
        <Typography color="error" variant="body1" align="center">
          {error.message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={handleRoleChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isNotificationsEnabled} onChange={handleNotificationsChange} />}
              label="Enable Notifications"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
              Save Settings
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
};

export default UserSettings;
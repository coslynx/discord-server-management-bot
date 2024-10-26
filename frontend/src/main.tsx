import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

const CustomContainer = styled(Container)(({ theme }) => ({
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

const LoginForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful login
        router.push('/dashboard');
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  if (session) {
    return (
      <CustomContainer maxWidth="sm">
        <CustomTypography variant="h4" align="center">
          Welcome, {session.user.email}!
        </CustomTypography>
        <Button variant="contained" onClick={() => signIn()}>
          Sign Out
        </Button>
      </CustomContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Discord Bot Login</title>
      </Head>
      <CustomContainer maxWidth="sm">
        <CustomTypography variant="h4" align="center">
          Discord Bot Login
        </CustomTypography>
        {errorMessage && (
          <Typography color="error" variant="body1" align="center">
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                error={errors.email?.type === 'required' || errors.email?.type === 'pattern'}
                helperText={errors.email?.type === 'required' ? 'Email is required' : 'Invalid email format'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: true })}
                error={errors.password?.type === 'required'}
                helperText={errors.password?.type === 'required' ? 'Password is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </CustomContainer>
    </>
  );
};

export default LoginForm;
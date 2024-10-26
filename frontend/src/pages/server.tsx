import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ServerInfoCard from '../../components/ServerInfoCard';
import { useEffect, useState } from 'react';
import { useGetServer } from '../../utils/apiClient';

const CustomContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ServerInfo = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, error } = useGetServer();

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  if (isLoading) {
    return (
      <CustomContainer maxWidth="sm">
        <Typography variant="h4" align="center">
          Loading Server Information...
        </Typography>
      </CustomContainer>
    );
  }

  if (error) {
    return (
      <CustomContainer maxWidth="sm">
        <Typography variant="h4" align="center">
          Error Loading Server Information
        </Typography>
        <Typography variant="body1" align="center">
          {error.message}
        </Typography>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer maxWidth="lg">
      <Typography variant="h4" align="center" mb={4}>
        Server Information
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ServerInfoCard
            title="Server Name"
            value={data.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServerInfoCard
            title="Server ID"
            value={data.id}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServerInfoCard
            title="Member Count"
            value={data.memberCount}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServerInfoCard
            title="Created At"
            value={new Date(data.createdAt).toLocaleDateString()}
          />
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default ServerInfo;
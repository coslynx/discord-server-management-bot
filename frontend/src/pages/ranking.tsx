import { Box, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetLeaderboard } from '../utils/apiClient';
import { Ranking } from '../types/ranking.types';

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

const CustomTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const RankingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: leaderboard, isLoading, error } = useGetLeaderboard();

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  if (isLoading) {
    return (
      <CustomContainer maxWidth="sm">
        <CustomTypography variant="h4" align="center">
          Loading Leaderboard...
        </CustomTypography>
      </CustomContainer>
    );
  }

  if (error) {
    return (
      <CustomContainer maxWidth="sm">
        <CustomTypography variant="h4" align="center" color="error">
          Error loading leaderboard: {error.message}
        </CustomTypography>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer maxWidth="lg">
      <CustomTypography variant="h4" align="center" mb={4}>
        Server Leaderboard
      </CustomTypography>
      <CustomTable>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((ranking: Ranking, index: number) => (
            <TableRow key={ranking.userId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{ranking.userId}</TableCell>
              <TableCell>{ranking.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CustomTable>
    </CustomContainer>
  );
};

export default RankingPage;
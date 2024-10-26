import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetLeaderboard } from '../utils/apiClient';
import { Ranking } from '../types/ranking.types';

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

const RankingTable = () => {
  const { data: leaderboard, isLoading, error } = useGetLeaderboard();

  if (isLoading) {
    return (
      <Typography variant="h6" align="center">
        Loading Leaderboard...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        Error loading leaderboard: {error.message}
      </Typography>
    );
  }

  return (
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
  );
};

export default RankingTable;
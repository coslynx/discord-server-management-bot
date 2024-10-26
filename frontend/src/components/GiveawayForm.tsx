import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateGiveaway } from '../utils/apiClient';

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

const GiveawayForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: createGiveaway, isLoading, error } = useCreateGiveaway();

  const [prize, setPrize] = useState('');
  const [duration, setDuration] = useState('');
  const [winners, setWinners] = useState('');

  const handlePrizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrize(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleWinnersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWinners(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createGiveaway({
        prize,
        duration: parseInt(duration, 10),
        winners: parseInt(winners, 10),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating giveaway:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  return (
    <CustomContainer maxWidth="sm">
      <CustomTypography variant="h4" align="center">
        Create a Giveaway
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
              label="Prize"
              fullWidth
              value={prize}
              onChange={handlePrizeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Duration (minutes)"
              type="number"
              fullWidth
              value={duration}
              onChange={handleDurationChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Winners"
              type="number"
              fullWidth
              value={winners}
              onChange={handleWinnersChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Create Giveaway
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
};

export default GiveawayForm;
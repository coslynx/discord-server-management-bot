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
import { useCreatePoll } from '../utils/apiClient';

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

const PollForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: createPoll, isLoading, error } = useCreatePoll();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleOptionsChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createPoll({
        question,
        options: options.map((option) => ({ name: option, votes: 0 })),
        duration,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  return (
    <CustomContainer maxWidth="sm">
      <CustomTypography variant="h4" align="center">
        Create a Poll
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
              label="Question"
              fullWidth
              value={question}
              onChange={handleQuestionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Options (Add more options as needed)
            </Typography>
            {options.map((option, index) => (
              <Grid key={index} item xs={12}>
                <TextField
                  label={`Option ${index + 1}`}
                  fullWidth
                  value={option}
                  onChange={handleOptionsChange(index)}
                />
                {index !== 0 && (
                  <Button variant="outlined" onClick={() => removeOption(index)}>
                    Remove
                  </Button>
                )}
              </Grid>
            ))}
            <Button variant="contained" onClick={addOption}>
              Add Option
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select value={duration} onChange={handleDurationChange}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1h">1 Hour</MenuItem>
                <MenuItem value="2h">2 Hours</MenuItem>
                <MenuItem value="1d">1 Day</MenuItem>
                <MenuItem value="2d">2 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Create Poll
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
};

export default PollForm;
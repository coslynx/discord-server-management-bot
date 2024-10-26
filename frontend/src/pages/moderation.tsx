import { Box, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUpdateModeration } from '../utils/apiClient';

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

const ModerationPanel = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: updateModeration, isLoading, error } = useUpdateModeration();

  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState('mute');
  const [reason, setReason] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (session) {
      // Fetch existing moderation settings if available
    }
  }, [session]);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value as 'mute' | 'ban' | 'kick' | 'warn');
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateModeration({
        keyword,
        action,
        reason,
        isActive,
      });
      // Handle successful moderation update
    } catch (error) {
      console.error('Error updating moderation:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  return (
    <CustomContainer maxWidth="sm">
      <CustomTypography variant="h4" align="center">
        Moderation Panel
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
              label="Keyword"
              fullWidth
              value={keyword}
              onChange={handleKeywordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Action</InputLabel>
              <Select value={action} onChange={handleActionChange}>
                <MenuItem value="mute">Mute</MenuItem>
                <MenuItem value="ban">Ban</MenuItem>
                <MenuItem value="kick">Kick</MenuItem>
                <MenuItem value="warn">Warn</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason"
              fullWidth
              value={reason}
              onChange={handleReasonChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isActive} onChange={handleActiveChange} />}
              label="Active"
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

export default ModerationPanel;
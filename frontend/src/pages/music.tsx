import { Box, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateMusic } from '../utils/apiClient';

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

const MusicPlayer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: createMusic, isLoading, error } = useCreateMusic();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleThumbnailUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailUrl(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleLyricsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLyrics(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createMusic({
        title,
        artist,
        url,
        thumbnailUrl,
        duration: parseInt(duration, 10),
        lyrics,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating music:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    router.push('/');
  }

  return (
    <CustomContainer maxWidth="sm">
      <CustomTypography variant="h4" align="center">
        Add Music
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
              label="Title"
              fullWidth
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Artist"
              fullWidth
              value={artist}
              onChange={handleArtistChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL"
              fullWidth
              value={url}
              onChange={handleUrlChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Thumbnail URL"
              fullWidth
              value={thumbnailUrl}
              onChange={handleThumbnailUrlChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Duration (seconds)"
              type="number"
              fullWidth
              value={duration}
              onChange={handleDurationChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Lyrics"
              fullWidth
              multiline
              value={lyrics}
              onChange={handleLyricsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Add Music
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
};

export default MusicPlayer;
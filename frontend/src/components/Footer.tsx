import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const Footer = () => (
  <Box mt={4} py={2} bgcolor="#f0f0f0">
    <CustomContainer maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} - Comprehensive Discord Bot - All rights reserved
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer" color="primary">
              Google
            </Link>
            <Typography variant="body2" color="textSecondary" mx={2}>
              |
            </Typography>
            <Link href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer" color="primary">
              Microsoft
            </Link>
            <Typography variant="body2" color="textSecondary" mx={2}>
              |
            </Typography>
            <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" color="primary">
              Amazon
            </Link>
          </Box>
        </Grid>
      </Grid>
    </CustomContainer>
  </Box>
);

export default Footer;
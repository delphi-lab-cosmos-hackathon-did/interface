import { OutlinedInput, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
const items = [
  {
    image:
      'https://pbs.twimg.com/profile_images/1579179879484063744/NL2jKAzX_400x400.jpg'
  }
];
export default function Home() {
  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          my: 4,
          display: 'flex',

          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography
            variant='h3'
            fontWeight={600}
            component='h1'
            gutterBottom
            color='white'
          >
            Explore your own{' '}
            <span style={{ color: '#00D1FF' }}> Cosmos Identity</span>
          </Typography>
          <Typography
            variant='h5'
            fontWeight={600}
            component='h1'
            gutterBottom
            color='white'
            mb={4}
          >
            Redeem your
            <span style={{ color: '#EAFF68' }}>
              {' '}
              Reputation, Achievement, Loyalty
            </span>
          </Typography>
          <OutlinedInput
            startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
            placeholder='Address'
            sx={{ width: 500, background: 'white', borderRadius: '8px' }}
          />
        </Box>
        <img width={300} src='/logo.png' alt='logo' />
      </Box>
      <Box borderRadius={2}>
        {items.map((item) => {
          return (
            <Box textAlign='center'>
              <img
                width={100}
                src={item.image}
                alt='logo'
                style={{ borderRadius: '50%', border: '5px solid black' }}
              />
              <Box sx={{}}>
                <Typography>OSMOSIS LP Provider</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

import Head from 'next/head'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Raspberry PI Plex</title>
        <meta name="description" content="Plex Media Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
    <Paper elevation={12}  sx={{borderRadius: 2, padding: 5}}>
    <Typography variant="h3" gutterBottom>
      Raspberry Plex Flex
    </Typography>
    <Box component="form" noValidate autoComplete="off">
      <Grid container justifyContent="space-between" alignItems="stretch" direction="column" spacing={2}>
        <Grid item>
      <TextField fullWidth autoFocus id='magnet-uri' label="Enter Magnet's URI"  variant="outlined" required multiline rows={4}/>
        </Grid>
        <Grid item>
      <Button fullWidth variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </Box>
      </Paper>
  </Grid>   
   
</Grid>
    </Container>
  )
}

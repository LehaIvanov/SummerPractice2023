import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function ContactUsPage(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Grid container direction="column" wrap="nowrap" gap={2} sx={{ marginY: 4 }}>
        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <TextField placeholder="Write down your message" multiline/>
          </FormControl>
        </Grid>

        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <TextField placeholder="Please leave your contacts here"/>
          </FormControl>
        </Grid>

        <Grid item alignSelf="flex-end">
          <Button variant="contained" size='large'>Send</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

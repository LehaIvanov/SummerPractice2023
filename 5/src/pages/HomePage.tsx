import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

type SecretQuestion = {
  readonly id: number;
  readonly text: string;
};

const secretQuestions: SecretQuestion[] = [
  {
    id: 1,
    text: `Your pet's name`
  },
  {
    id: 2,
    text: 'Your lovely React UI Library name'
  },
];

export default function Home(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [secretQuestion, setSecretQuestion] = useState<SecretQuestion>(secretQuestions[0]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordTooSmall: boolean = password.length < 6;
  const showPasswordError: boolean = password !== '' && isPasswordTooSmall;

  const handleClickShowPassword = () => setShowPassword((currentValue: boolean) => !currentValue);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSecretQuestionChange = (selectedId: string | number) => {
    if (typeof selectedId === 'string') {
      return;
    }

    const newSelectedSecretQuestion: SecretQuestion | undefined = secretQuestions.find(
        (secretQuestion: SecretQuestion) => secretQuestion.id === selectedId);

    setSecretQuestion(newSelectedSecretQuestion ?? secretQuestions[0]);
  }

  return (
    <Container maxWidth="xs">
      <Grid container direction="column" wrap="nowrap" gap={2} sx={{ marginY: 4 }}>
        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <TextField label="Username"/>
          </FormControl>
        </Grid>

        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              value={password}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              helperText={showPasswordError && 'Password must have at least 6 characters'}
              error={showPasswordError}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>

        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Secret question</InputLabel>
            <Select
              value={secretQuestion.id}
              label="Secret question"
              onChange={(event: SelectChangeEvent<number>) => handleSecretQuestionChange(event.target.value)}
            >
              {secretQuestions.map((secretQuestion: SecretQuestion) => (
                <MenuItem key={secretQuestion.id} value={secretQuestion.id}>{secretQuestion.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item flexGrow={1}>
          <FormControl variant="outlined" fullWidth>
            <TextField label="Answer"/>
          </FormControl>
        </Grid>

        <Grid item alignSelf="flex-end">
          <Button variant="contained" size='large'>Register</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

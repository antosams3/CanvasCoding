import * as React from 'react';
import { Avatar, CssBaseline, TextField, Link, Paper, Box, Grid, Alert, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginForm(props) {
  const { handleLogin, message, setMessage, loading, isloggedIn } = props;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    setEmail('');
    setPassword('');
    setMessage('');
    if (isloggedIn === true) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [isloggedIn, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const credentials = { email: email, password: password }
      handleLogin(credentials);
    }


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ev => setEmail(ev.target.value.replace(/\s/g, ''))}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ev => setPassword(ev.target.value)}
              />
              {message &&
                <Alert severity={message?.severity} onClose={() => setMessage('')}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>{message?.title}</Typography>
                    <Typography variant="subtitle2">{message?.content}</Typography>
                  </Box>
                </Alert>
              }
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link onClick={() => { navigate('/signup') }} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


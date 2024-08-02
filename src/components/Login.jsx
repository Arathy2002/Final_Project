import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const textFieldStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white',
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const endpoint = role === 'admin' ? 'http://localhost:3002/loginadmin' : 'http://localhost:3002/login';

    try {
      // console.log(`Sending request to ${endpoint} with data:`, { email, password });
      const response = await axios.post(endpoint, { email, password });
      const data = response.data;
      console.log(data);
      if (data.status === 'success') {
        alert('Login successful!');
        if (role === 'admin') {
          navigate('/admin', {
            state: { email: data.user.email, name: data.user.name, id: data.user.id },
          });
        } else {
          navigate('/userdashboard', {
            state: { email: data.user.email, name: data.user.name, id: data.user.id },
          });
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        setError('An error occurred');
      } else if (error.request) {
        setError('No response received from server');
      } else {
        setError('Error:', error.message);
      }
    };
  }
    

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '20px',
      }}
    >
      <form
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          color: 'white',
          zIndex: '1',
          backdropFilter: 'blur(100px) brightness(300%)',
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h3" align="center" gutterBottom>
              LOGIN
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label" sx={{ color: 'white' }}>
                Role
              </InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'white',
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="filled"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography variant="body2" color="error" align="center" style={{ marginBottom: '10px' }}>
                {error}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#FFFFE0', // Light yellow color
                color: 'black',
                '&:hover': {
                  backgroundColor: '#FFFACD', // Lighter yellow on hover
                },
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
              <Typography sx={{ marginRight: '10px' }}>Don't have an account?</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFFFE0', // Light yellow color
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#FFFFE0', // Lighter yellow on hover
                  },
                }}
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login
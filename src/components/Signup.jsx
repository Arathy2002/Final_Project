import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
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

const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '20px',
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  color: 'white',
  zIndex: '1',
  backdropFilter: 'blur(100px) brightness(300%)',
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    country: '',
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/add', formData);
      console.log(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    navigate('/userdashboard');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <Container style={{ ...containerStyle, maxWidth: '500px', margin: '0 auto' }}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center" gutterBottom>
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                type="text"
                label="Name"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phoneNumber"
                type="text"
                label="Phone Number"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                type="text"
                label="Address"
                variant="filled"
                fullWidth
                sx={textFieldStyles}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="filled" fullWidth sx={textFieldStyles}>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                </Select>
              </FormControl>
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
                Create Account
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography sx={{ textAlign: 'left', marginRight: 'auto' }}>
                  Already have an account?
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{
                    backgroundColor: '#FFFFE0', // Light yellow color
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#FFFACD', // Lighter yellow on hover
                    },
                  }} 
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Account Created Successfully"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your account has been created successfully. You will be redirected to your dashboard.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Signup;

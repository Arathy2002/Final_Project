import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Drawer,
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, name, id } = location.state || {};
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(true); // State to control drawer open/close
  const [dialogOpen, setDialogOpen] = useState(false); // State to control profile dialog
  const [userDetails, setUserDetails] = useState({ name, email, password: '' }); // State for user details

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/transactions/${id}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [id]);

  const handleAddTransaction = () => {
    navigate('/add-transaction', { state: { email, userId: id } });
  };

  const handleViewTransactionHistory = () => {
    navigate('/transaction-history', { state: { email, id } });
  };

  const handleProfileClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put('http://localhost:3002/update-user', userDetails);
      if (response.data.status === 'success') {
        alert('User details updated successfully!');
        setDialogOpen(false);
      } else {
        console.error('Error updating user details:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#f5f5dc' }} // Cream color
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#000' }}> {/* Heading color */}
            User Dashboard
          </Typography>
          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={handleProfileClick}>
              <ProfileIcon sx={{ color: '#000' }} /> {/* Profile icon color */}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#f5f5dc', // Cream color
            color: '#000',
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddTransaction}
            style={{ 
              marginBottom: '10px', 
              backgroundColor: '#000', 
              color: '#fff', 
              border: '1px solid #000',
              width: '100%',
            }}
          >
            Add Transaction
          </Button>
          <Button
            variant="contained"
            onClick={handleViewTransactionHistory}
            style={{ 
              marginBottom: '10px', 
              backgroundColor: '#000', 
              color: '#fff', 
              border: '1px solid #000',
              width: '100%',
            }}
          >
            View Transaction History
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          padding: '20px', 
          width: `calc(100% - ${drawerWidth}px)`, 
          color: '#000', 
          marginTop: '64px',
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDoj8CIv91dlwoZleW0bQ47w9trQfBfCnHA&s")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ background: 'none', color: '#000' }}> {/* Remove background and set text color */}
          Welcome {name}
        </Typography>
        <Grid container spacing={2}>
          {transactions.length === 0 ? (
            <Typography variant="body1" color="#555"></Typography>
          ) : (
            <List>
              {transactions.map((transaction, index) => (
                <ListItem key={index}>
                  <Card variant="outlined" style={{ width: '100%', backgroundColor: '#f5f5f5', color: '#000' }}>
                    <CardContent>
                      <ListItemText
                        primary={`Amount: ${transaction.amount}`}
                        secondary={`Date: ${transaction.date}`}
                      />
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Box>

      {/* Profile Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;

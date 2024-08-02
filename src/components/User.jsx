import React, { useState, useEffect } from 'react';
import {
  Button, Container, Grid, Typography, TextField, Card, CardContent,
  List, ListItem, ListItemText, IconButton, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import styled from 'styled-components';

// Styled components for User Dashboard
const StyledCard = styled(Card)`
  margin: 20px;
  max-width: 600px;
  width: 100%;
  background-color: #AAA; /* White background for the card */
  color: #000; /* Black text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for contrast */
`;

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });
  const [categories, setCategories] = useState(['Salary', 'Investment', 'Food', 'Entertainment', 'Utilities']);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    // Fetch existing transactions for the user (mock data)
    const fetchTransactions = async () => {
      setTransactions([
        { id: 1, amount: '$500', category: 'Salary', date: '2024-07-01', description: 'Monthly salary' },
        // Additional mock transactions
      ]);
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = () => {
    if (editingTransaction) {
      setTransactions(transactions.map(transaction => (transaction.id === editingTransaction.id ? newTransaction : transaction)));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    }
    setNewTransaction({ amount: '', category: '', date: '', description: '' });
  };

  const handleEditTransaction = (transaction) => {
    setNewTransaction(transaction);
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = (transaction) => {
    setIsDeleteDialogOpen(true);
    setDeleteItem(transaction);
  };

  const confirmDelete = () => {
    setTransactions(transactions.filter(transaction => transaction.id !== deleteItem.id));
    setIsDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add Transaction
              </Typography>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                >
                  {categories.map((cat, index) => (
                    <MenuItem key={index} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTransaction}
                fullWidth
              >
                {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
              </Button>
              <List>
                {transactions.map((transaction) => (
                  <ListItem key={transaction.id} secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditTransaction(transaction)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTransaction(transaction)}>
                        <Delete />
                      </IconButton>
                    </>
                  }>
                    <ListItemText
                      primary={`Amount: ${transaction.amount} | Category: ${transaction.category} | Date: ${transaction.date}`}
                      secondary={transaction.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;

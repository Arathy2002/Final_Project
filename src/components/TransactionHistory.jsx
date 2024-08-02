import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const styles = {
  table: {
    marginTop: '90px',
    backgroundColor: '#fff',
    marginLeft: '10vh',
    width: '80%' // Adjusted width to use more of the available space
  },
};

const Showexpense = () => {
  const [transactions, setTransactions] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [updatedTransaction, setUpdatedTransaction] = useState({ amount: '', category: '', date: '' });
  const location = useLocation();
  const { id } = location.state || { id: 'N/A' };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3002/expenses', { params: { userId: id } });
        if (response.data.status === 'success') {
          setTransactions(response.data.expenses);
        } else {
          console.error('Error fetching expenses:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (id !== 'N/A') {
      fetchExpenses();
    }
  }, [id]);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await axios.get('http://localhost:3002/delete-expense', { params: { transactionId, userId: id } });
      if (response.data.status === 'success') {
        setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      } else {
        console.error('Error deleting transaction:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setUpdatedTransaction({
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date
    });
    setEditDialogOpen(true);
  };

  const handleUpdateTransaction = async () => {
    try {
      const response = await axios.put('http://localhost:3002/update-expense', {
        ...updatedTransaction,
        transactionId: currentTransaction._id,
        userId: id
      });
      console.log('Response:', response.data); // Log response data
      if (response.data.status === 'success') {
        setTransactions(transactions.map(transaction =>
          transaction._id === currentTransaction._id ? { ...transaction, ...updatedTransaction } : transaction
        ));
        setEditDialogOpen(false);
      } else {
        console.error('Error updating transaction:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTransaction(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ overflowX: 'hidden', position: 'relative', height: '100vh', width: '100%', paddingLeft: '30px' }}>
      <Table style={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => handleEditTransaction(transaction)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="secondary" onClick={() => handleDeleteTransaction(transaction._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Transaction Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            name="amount"
            value={updatedTransaction.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            name="category"
            value={updatedTransaction.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            name="date"
            value={updatedTransaction.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTransaction} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Showexpense;

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Container, Typography, TextField, Card, CardContent,
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const StyledCard = styled(Card)`
  margin: 20px auto;
  max-width: 600px;
  width: 100%;
  background-color: #000;
  color: #AAA;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #555;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-input {
    color: #AAA;
  }
  & .MuiInputLabel-root {
    color: #AAA;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #555;
    }
    &:hover fieldset {
      border-color: #777;
    }
    &.Mui-focused fieldset {
      border-color: #AAA;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  & .MuiInputBase-input {
    color: #AAA;
  }
  & .MuiInputLabel-root {
    color: #AAA;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #555;
    }
    &:hover fieldset {
      border-color: #777;
    }
    &.Mui-focused fieldset {
      border-color: #AAA;
    }
  }
`;

const StyledSelect = styled(Select)`
  & .MuiInputBase-input {
    color: #AAA;
  }
  & .MuiInputLabel-root {
    color: #AAA;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #555;
    }
    &:hover fieldset {
      border-color: #777;
    }
    &.Mui-focused fieldset {
      border-color: #AAA;
    }
  }
`;

const StyledButton = styled(Button)`
  color: #fff !important;
  background-color: #333 !important;
  margin-top: 16px !important;
  &:hover {
    background-color: #555 !important;
  }
`;


const AddTransaction = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const { email, userId } = location.state || {}; 
    const categories = ['Salary', 'Investment', 'Food', 'Entertainment', 'Utilities'];
    const handleAddTransaction = async (e) => {
        e.preventDefault();
       

        // Check if all fields are filled
        if (!amount || !category || !date || !description) {
            console.error('Please fill out all required fields.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3002/addexpense', {
                email: email.trim(), 
                category,
                description, 
                amount,
                date,
            });
    
            console.log('Transaction added:', response.data);
    
          
            setAmount('');
            setCategory('');
            setDate('');
            setDescription('');
        } catch (error) {
           // Improved error handling
           const errorMessage = error.response?.data || error.message || 'Error adding transaction. Please try again.';
           console.error('Error adding transaction:', errorMessage);
           setError(errorMessage);
        }
    };
    

  return (
      <div>
   <Container>
      <Typography variant="h4" gutterBottom style={{ color: '#AAA' }}>
        Add Transaction
      </Typography>
      <StyledCard>
        <CardContent>
          <StyledTextField
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <StyledFormControl fullWidth margin="normal">
            <InputLabel style={{ color: '#AAA' }}>Category</InputLabel>
            <StyledSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
          <StyledTextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <StyledTextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <StyledButton
            variant="contained"
              fullWidth
              onClick={handleAddTransaction}
          >
            Add Transaction
          </StyledButton>
        </CardContent>
      </StyledCard>
      <ToastContainer />
    </Container>
        </div>
    );
};

export default AddTransaction;

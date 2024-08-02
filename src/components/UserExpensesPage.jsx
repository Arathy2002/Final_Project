// src/pages/UserExpensesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black */
  background-image: url("https://wallpapers.com/images/hd/finance-background-yrdtwpxuwwj8bvbp.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const UserExpensesPage = () => {
  const [userExpenses, setUserExpenses] = useState([]);

  useEffect(() => {
    const fetchUserExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        const expenseData = response.data;

        // Group expenses by userId
        const expenseMap = expenseData.reduce((acc, expense) => {
          if (!acc[expense.userId]) {
            acc[expense.userId] = { userId: expense.userId, totalAmount: 0 };
          }
          acc[expense.userId].totalAmount += expense.amount;
          return acc;
        }, {});

        // Convert map to array
        const userExpensesArray = Object.values(expenseMap);
        setUserExpenses(userExpensesArray);
      } catch (error) {
        console.error('Error fetching user expenses:', error);
      }
    };

    fetchUserExpenses();
  }, []);

  return (
    <ContentContainer>
      <Typography variant="h4" gutterBottom>
        User Expenses Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#000' }}>User ID</TableCell>
              <TableCell style={{ color: '#000' }}>Total Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userExpenses.map((userExpense) => (
              <TableRow key={userExpense.userId}>
                <TableCell style={{ color: '#000' }}>{userExpense.userId}</TableCell>
                <TableCell style={{ color: '#000' }}>{userExpense.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContentContainer>
  );
};

export default UserExpensesPage;

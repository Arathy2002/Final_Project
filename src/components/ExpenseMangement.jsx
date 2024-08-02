import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled.div`
  margin: 20px;
  max-width: 800px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 8px;
`;

const Heading = styled(Typography)`
  color: #fff;
  margin-bottom: 20px;
`;

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [userExpenses, setUserExpenses] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesResponse = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(expensesResponse.data);

        // Assuming there's an endpoint to get user details for calculating total expenses per user
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        const userExpMap = {};
        expensesResponse.data.forEach(exp => {
          if (!userExpMap[exp.userId]) {
            userExpMap[exp.userId] = { total: 0, name: usersResponse.data.find(user => user.id === exp.userId)?.name || 'Unknown' };
          }
          userExpMap[exp.userId].total += parseFloat(exp.amount);
        });
        setUserExpenses(userExpMap);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={8}>
        <StyledCard>
          <Heading variant="h6" gutterBottom>
            View Expenses
          </Heading>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#000' }}>Username</TableCell>
                  <TableCell style={{ color: '#000' }}>Total Expense</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(userExpenses).map(([userId, { total, name }]) => (
                  <TableRow key={userId}>
                    <TableCell style={{ color: '#000' }}>{name}</TableCell>
                    <TableCell style={{ color: '#000' }}>{total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default ExpenseManagement;

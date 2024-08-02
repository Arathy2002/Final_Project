import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin: 20px;
  max-width: 600px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
`;

const UserCard = styled(Card)`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const UserAvatar = styled(Avatar)`
  margin-right: 20px;
  width: 60px;
  height: 60px;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const ViewTransactionsButton = styled(Button)`
  background-color: #fff;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userExpenses, setUserExpenses] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);

        const expensesResponse = await axios.get('http://localhost:5000/api/expenses');
        const userExpMap = {};
        expensesResponse.data.forEach(exp => {
          if (!userExpMap[exp.userId]) {
            userExpMap[exp.userId] = [];
          }
          userExpMap[exp.userId].push(exp);
        });
        setUserExpenses(userExpMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewTransactions = (user) => {
    setSelectedUser(user);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <StyledCard>
          <Typography variant="h6" gutterBottom>
            User Management
          </Typography>
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <UserCard>
                  <UserAvatar src={user.avatarUrl || '/default-avatar.png'} alt={user.name} />
                  <UserDetails>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Transactions: {userExpenses[user.id] ? userExpenses[user.id].length : 0}
                    </Typography>
                    <ViewTransactionsButton
                      variant="contained"
                      onClick={() => handleViewTransactions(user)}
                      style={{ marginTop: '10px' }}
                    >
                      View Transactions
                    </ViewTransactionsButton>
                  </UserDetails>
                </UserCard>
              </Grid>
            ))}
          </Grid>
        </StyledCard>
      </Grid>
      {selectedUser && (
        <Grid item xs={12} sm={8} md={6}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Transactions for {selectedUser.name}
            </Typography>
            {/* Add table or other components to display transactions */}
          </StyledCard>
        </Grid>
      )}
    </Grid>
  );
};

export default UserManagement;

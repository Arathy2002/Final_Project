import React from 'react';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = styled.div`
  width: 240px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
  color: #000 !important; /* Black text */
  background-color: #fff !important; /* White background */
  text-align: left;
  &:hover {
    background-color: #f0f0f0 !important; /* Light grey background on hover */
  }
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
`;

const IconContainer = styled.div`
  margin-right: 15px;
`;

const ContentContainer = styled.div`
  margin-left: 260px;
  padding: 20px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar>
        <SidebarButton variant="contained" onClick={() => navigate('/admin/profile')}>
          <IconContainer>
            <PersonIcon />
          </IconContainer>
          Profile
        </SidebarButton>
        <br /><br />
        <SidebarButton variant="contained" onClick={() => navigate('/admin/user-management')}>
          <IconContainer>
            <PersonIcon />
          </IconContainer>
          User Management
        </SidebarButton>
        <br /><br />
        <SidebarButton variant="contained" onClick={() => navigate('/admin/expense-management')}>
          Expense Management
        </SidebarButton>
      </Sidebar>
      <ContentContainer>
        {/* Add your routing logic here to render UserManagement or ExpenseManagement or Profile based on the route */}
      </ContentContainer>
    </>
  );
};

export default Admin;

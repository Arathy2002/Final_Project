import React from 'react'
import { AccountBalance, AdminPanelSettings, Bathroom, ExpandCircleDown, Home, Mail, ManageAccountsOutlined, Person2, Person2Outlined, PersonPinCircleOutlined } from '@mui/icons-material';

export const Sidebar = [
  
    {
        title: "Profile",
        icon: <Person2Outlined />,
        link:"/adminprofile"
    },
    {
        title: "User Administration",
        icon: <ManageAccountsOutlined />,
        link:"/useradmin"
    },
  
]
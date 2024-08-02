import React from 'react';
import '../style/landing.css';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  margin-top: -300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Landing = () => {
  console.log("Landing component rendered");
  return (
    <div>
      <div className="video-background">
        {/* <video autoPlay muted loop id="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div> */}
        <div className="title">
          <Typography variant="h1">FINANCE</Typography>
          <Typography variant="h2">Tracking System</Typography>
          <p>The purpose of the Personal Finance Management App is to provide users with a platform to
            manage their personal finances effectively by tracking income, expenses, setting budgets, and
            achieving financial goals.
          </p>
        </div>
      </div>
      <Container>
        <Button id='btn'>
          <Link to='/signup' className='link'>Sign In</Link>
        </Button>
      </Container>
      <ButtonContainer>
        {/* <Button id='btn2'>
          <Link to='/signup' className='link'>Sign Up</Link>
        </Button> */}
        <Button id='btn1'>
          <Link to='/login' className='link'>Login</Link>
        </Button>
        <Button id='btn3'>
          <Link to='/about' className='link'>About</Link>
        </Button>
        <Button id='btn4'>
          <Link to='/admin' className='link'>Admin</Link>
        </Button>
        {/* <Button id='btn4'>
          <Link to='/admin' className='link'>User</Link>
        </Button> */}
      </ButtonContainer>
    </div>
  );
};

export default Landing;

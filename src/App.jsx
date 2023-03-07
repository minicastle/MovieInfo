import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import Navbar from './Components/NavBar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/daily' element={
            <>
              <Navbar></Navbar>
              <Homepage></Homepage>
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App

import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import Navbar from './Components/NavBar';
import DailyPage from './Pages/DailyPage';
import axios, { Axios } from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #B9F3E4;
`;

function App() {
  const [dailyData,setDailyData] = useState();
  /** 데일리 데이터 받아오기 */
  const GetDailyData = useCallback(()=>{
    axios.get('/HerokuApi/Kobis/movie/daily?targetDt=20230307')
    .then((res)=>{
      setDailyData(res.data);
    }).catch((error)=>{
      setDailyData(error);
    });
  },[]);

  useEffect(()=>{
    GetDailyData();
    return ()=>{
      setDailyData();
    }
  },[])
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar page='home'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/daily' element={
            <>
              <Navbar page='daily'></Navbar>
              <DailyPage dailyData={dailyData}></DailyPage>
            </>
          }/>
          <Route path='/search' element={
            <>
              <Navbar page='search'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/update' element={
            <>
              <Navbar page='update'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/movie-info' element={
            <>
              <Navbar page='movie-info'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/question' element={
            <>
              <Navbar page='question'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
          <Route path='/site-info' element={
            <>
              <Navbar page='site-info'></Navbar>
              <Homepage></Homepage>
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App

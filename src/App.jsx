import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import Navbar from "./Components/NavBar";
import DailyPage from "./Pages/DailyPage";
import axios, { Axios } from "axios";
import SearchPage from "./Pages/SearchPage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #b9f3e4;
`;

function App() {
  const [dailyData, setDailyData] = useState();
  /** 데일리 데이터 사용 날짜 */
  const now = new Date();
  const yesterDay = new Date(now.setDate(now.getDate() - 1));
  const year = String(yesterDay.getFullYear());
  const month =
    String(yesterDay.getMonth() + 1).length === 2
      ? String(yesterDay.getMonth() + 1)
      : "0" + (yesterDay.getMonth() + 1);
  const date =
    String(yesterDay.getDate()).length === 2
      ? String(yesterDay.getDate())
      : "0" + yesterDay.getDate();
  const fullDate = year + month + date;
  /** 데일리 데이터 받아오기 */
  const GetDailyData = useCallback(() => {
    axios
      .get(`/HerokuApi/Kobis/movie/daily?targetDt=${fullDate}`)
      .then((res) => {
        setDailyData(res.data);
      })
      .catch((error) => {
        setDailyData(error);
      });
  }, []);

  useEffect(() => {
    if (dailyData === undefined) {
      GetDailyData();
    }
    return () => {
      setDailyData();
    };
  }, []);
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/MovieInfo/"
            element={
              <>
                <Navbar page="home"></Navbar>
                <Homepage></Homepage>
              </>
            }
          />
          <Route
            path="/MovieInfo/daily"
            element={
              <>
                <Navbar page="daily"></Navbar>
                <DailyPage dailyData={dailyData}></DailyPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/search"
            element={
              <>
                <Navbar page="search"></Navbar>
                <SearchPage></SearchPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/update"
            element={
              <>
                <Navbar page="update"></Navbar>
                <Homepage></Homepage>
              </>
            }
          />
          <Route
            path="/MovieInfo/movie-info"
            element={
              <>
                <Navbar page="movie-info"></Navbar>
                <Homepage></Homepage>
              </>
            }
          />
          <Route
            path="/MovieInfo/question"
            element={
              <>
                <Navbar page="question"></Navbar>
                <Homepage></Homepage>
              </>
            }
          />
          <Route
            path="/MovieInfo/site-info"
            element={
              <>
                <Navbar page="site-info"></Navbar>
                <Homepage></Homepage>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

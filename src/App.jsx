import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import Navbar from "./Components/NavBar";
import DailyPage from "./Pages/DailyPage";
import SearchPage from "./Pages/SearchPage";
import "./Components/FontFormat.css";
import MovieInfo from "./Pages/MovieInfo";
import { KobisDaily } from "./API/Artifact/KobisAPI";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #b9f3e4;
  a {
    text-decoration: none;
    color: black;
  }
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
  const handleStorage = useCallback(() => {
    if (dailyData !== undefined) {
      window.localStorage.setItem(
        "dailyData" + fullDate,
        JSON.stringify(dailyData)
      );
    }
  }, [dailyData]);
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      handleStorage();
      return (event.returnValue = "Are you sure you want to exit?");
    };
    window.addEventListener("beforeunload", handleTabClose);
    let value = JSON.parse(window.localStorage.getItem("dailyData" + fullDate));
    if (!value) {
      KobisDaily(fullDate).then((res) => {
        setDailyData(res);
      });
    } else {
      setDailyData(value);
    }
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
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
                <MovieInfo></MovieInfo>
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

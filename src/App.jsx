import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import DailyPage from "./Pages/DailyPage";
import SearchPage from "./Pages/SearchPage";
import "./Components/FontFormat.css";
import MovieInfo from "./Pages/MovieInfo";
import { KobisDaily } from "./API/Artifact/KobisAPI";
import UpdatePage from "./Pages/UpdatePage";
import QuestionPage from "./Pages/QuestionPage";
import SiteInfoPage from "./Pages/SiteInfoPage";

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
  useEffect(() => {
    if (dailyData == undefined) {
      let value = window.localStorage.getItem("dailyData" + fullDate);
      let ListUp = window.localStorage.getItem("movieList");
      if (!ListUp || ListUp === "undefined") {
        window.localStorage.setItem("movieList", JSON.stringify([]));
      }
      if (!value || value === "undefined") {
        KobisDaily(fullDate).then((res) => {
          setDailyData(res);
        });
      } else {
        setDailyData(value);
      }
    }
    // setTimeout(() => {
    //   window.localStorage.setItem(
    //     "dailyData" + fullDate,
    //     JSON.stringify(dailyData)
    //   );
    // }, 7000);
    return () => {};
  }, [dailyData]);
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/MovieInfo/"
            element={
              <>
                <Navbar page="home"></Navbar>
                <SiteInfoPage></SiteInfoPage>
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
                <UpdatePage></UpdatePage>
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
                <QuestionPage></QuestionPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/site-info"
            element={
              <>
                <Navbar page="site-info"></Navbar>
                <SiteInfoPage></SiteInfoPage>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

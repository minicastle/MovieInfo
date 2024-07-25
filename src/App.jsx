import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import DailyPage from "./Pages/DailyPage";
import SearchPage from "./Pages/SearchPage";
import "./Components/FontFormat.css";
import MovieInfo from "./Pages/MovieInfo";
import { KobisDaily } from "./API/Artifact/KobisAPI";
import UpdatePage from "./Pages/UpdatePage";
import QuestionPage from "./Pages/QuestionPage";
import SiteInfoPage from "./Pages/SiteInfoPage";
import { TfiClose, TfiMenu } from "react-icons/tfi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #d6fff3;
  a {
    text-decoration: none;
    color: black;
  }
  position: relative;
  overflow: hidden;
`;
/** NavBar최소화 */
const NavMiniMize = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  font-size: 70px;
  width: 100%;
  height: 110px;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  background-color: #7286d3;
  overflow: hidden;
  @media screen and (max-width: 950px) {
    display: flex;
    position: absolute;
    top: 0;
  }
  @media screen and (max-width: 650px) {
    font-size: 50px;
  }
  @media screen and (max-width: 550px) {
    font-size: 30px;
    height: 50px;
  }
  z-index: 100;
`;
/**로고 spacer */
const Spacer = styled.div`
  width: 70px;
  @media screen and (max-width: 650px) {
    width: 50px;
  }
`;
/** 로고 콘테이너 */
const Logo = styled.img`
  cursor: pointer;
  width: 300px;
  transition: 300ms ease-in-out;
  :hover {
    scale: 1.02;
  }
  :active {
    scale: 1;
  }
  @media screen and (max-width: 550px) {
    width: 50%;
    max-width: 200px;
  }
`;
function App() {
  const [minimize, setMinimize] = useState(true);
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
  const handleMinimize = useCallback(() => {
    setMinimize(!minimize);
  });
  useEffect(() => {
    if (dailyData === undefined) {
      let value = window.localStorage.getItem("dailyData" + fullDate);
      let ListUp = window.localStorage.getItem("movieList");
      if (ListUp === null) {
        window.localStorage.setItem("movieList", JSON.stringify([]));
      }
      if (value === null) {
        KobisDaily(fullDate).then((res) => {
          setDailyData(res);
        });
      } else {
        setDailyData(JSON.parse(value));
      }
    }
    const dataSet = setInterval(() => {
      if (dailyData[0].poster !== undefined) {
        window.localStorage.setItem(
          "dailyData" + fullDate,
          JSON.stringify(dailyData)
        );
        clearInterval(dataSet);
      }
    }, 2000);
    return () => {
      clearInterval(dataSet);
    };
  }, [dailyData]);
  return (
    <Container>
      <NavMiniMize>
        <Spacer></Spacer>
        <Logo
          src="./MoverLogo.png"
          onClick={() => {
            window.location.href = "https://minicastle.github.io/MovieInfo/";
          }}
        />
        {minimize ? (
          <TfiMenu
            onClick={() => {
              handleMinimize();
            }}
          ></TfiMenu>
        ) : (
          <TfiClose
            onClick={() => {
              handleMinimize();
            }}
          ></TfiClose>
        )}
      </NavMiniMize>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar
                  page="home"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <SiteInfoPage></SiteInfoPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/daily"
            element={
              <>
                <Navbar
                  page="daily"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <DailyPage dailyData={dailyData}></DailyPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/search"
            element={
              <>
                <Navbar
                  page="search"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <SearchPage></SearchPage>
              </>
            }
          />
          <Route
            path="/MovieInfo/update"
            element={
              <>
                <Navbar
                  page="update"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <UpdatePage></UpdatePage>
              </>
            }
          />
          <Route
            path="/MovieInfo/movie-info"
            element={
              <>
                <Navbar
                  page="movie-info"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <MovieInfo></MovieInfo>
              </>
            }
          />
          <Route
            path="/MovieInfo/question"
            element={
              <>
                <Navbar
                  page="question"
                  minimize={minimize}
                  handleMinimize={handleMinimize}
                ></Navbar>
                <QuestionPage></QuestionPage>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

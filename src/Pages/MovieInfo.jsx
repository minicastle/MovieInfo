import React, { createElement, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { BuildProxy } from "../buildConfig/proxyConfig";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Size40Bold } from "../Components/TextFormat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
/** 데이터를 불러오고 있을시 나오는 페이지 */
const NoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 50px;
  font-weight: bold;
  color: #ff6464;
  font-family: "CM";
`;
/** 데이터를 불러오고 있을시 나오는 페이지 로딩 이미지 */
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  animation: LoadingRotate 2s linear infinite;
  @keyframes LoadingRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(365deg);
    }
  }
`;
/** 영화정보 확인 콘테이너 */
const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  height: 95vh;
  background-color: white;
  overflow-y: scroll;
`;
/** 영화관련 카페글 목록 */
const MovieInfoCafe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  border: 1px solid black;
  box-shadow: 2px 4px 8px #aaaaaa;
  max-width: 690px;
`;
/** 영화 카페글 */
const MovieInfoCafeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
`;
function MovieInfo() {
  const [mode, setMode] = useState("list");
  const [movieInfo, setMovieInfo] = useState();
  const [movieCafe, setMovieCafe] = useState();
  const [movieList, setMovieList] = useState();
  const location = useLocation();
  const params = String(location.search).split(/[=,&]/g);
  const CafeItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < movieCafe.length; i++) {
      contents.push(
        <Link
          to={`${movieCafe[i].link}`}
          target="_blank"
          key={`linkTo${i}`}
          style={{ width: "100%" }}
        >
          <MovieInfoCafeItem
            title={String(movieCafe[i].description).replace(
              /[<b>,</b>,<p>,</p>,&lt;,&gt;]/g,
              ""
            )}
            key={`movieInfoCafeItem${i}`}
            dangerouslySetInnerHTML={{
              __html: String(movieCafe[i].title).replace(/[<b>,</b>]/g, " "),
            }}
          ></MovieInfoCafeItem>
        </Link>
      );
    }
    return contents;
  }, [movieCafe]);
  useEffect(() => {
    if (params.length === 1) {
      setMode("list");
      setMovieList(window.localStorage.getItem("movieList"));
    } else {
      setMode("info");
      axios
        .get(`${BuildProxy}/kobis/movie/info?movieCd=${params[1]}`)
        .then((res) => {
          setMovieInfo(res.data);
        });
      axios
        .get(`${BuildProxy}/Naver/movie/cafe?title=${params[3]}`)
        .then((res) => {
          setMovieCafe(res.data);
        });
    }
  }, []);
  return (
    <Container>
      {mode === "list" ? (
        <></>
      ) : movieInfo === undefined || movieCafe === undefined ? (
        <NoData>
          <LoadingIcon>
            <AiOutlineLoading3Quarters />
          </LoadingIcon>
          Loading Now! Please Wait~~ q(≧▽≦q)
        </NoData>
      ) : (
        <MovieInfoContainer>
          <MovieInfoCafe>
            <Size40Bold
              style={{
                padding: "10px",
                backgroundColor: "#2db400",
                width: "100%",
                boxSizing: "border-box",
              }}
              color="ffffff"
            >
              Naver Cafe
            </Size40Bold>
          </MovieInfoCafe>
          <MovieInfoCafe>{CafeItemGen()}</MovieInfoCafe>
        </MovieInfoContainer>
      )}
    </Container>
  );
}

export default MovieInfo;

import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { Size40Bold } from "../Components/TextFormat";
import { KobisInfo } from "../API/Artifact/KobisAPI";
import { NaverCafe } from "../API/Artifact/NaverAPI";
import Loading from "../Components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
      KobisInfo(params[1]).then((value) => {
        setMovieInfo(value);
      });
      NaverCafe(params[3]).then((value) => {
        setMovieCafe(value);
      });
    }
  }, []);
  return (
    <Container>
      {mode === "list" ? (
        <></>
      ) : movieInfo === undefined || movieCafe === undefined ? (
        <Loading></Loading>
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

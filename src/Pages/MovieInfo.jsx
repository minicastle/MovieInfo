import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import {
  Size20,
  Size20Wrap,
  Size30Bold,
  Size40Bold,
} from "../Components/TextFormat";
import { KobisInfo } from "../API/Artifact/KobisAPI";
import { NaverCafe, NaverPoster } from "../API/Artifact/NaverAPI";
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
/** 영화 설명 콘테이너 */
const MovieInformatin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: fit-content;
  margin: 20px 0 40px;
  gap: 30px;
  border: 1px solid black;
  border-radius: 5px;
`;
/** 영화 포스터 콘테이너 */
const MovieInformationPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  padding: 5px;
  max-width: 400px;
  height: 100%;
  overflow: hidden;
`;
/** 영화 정보 콘테이너 */
const MovieInformationTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  gap: 5px;
  padding: 5px;
  border-left: 1px solid black;
  box-sizing: border-box;
  position: relative;
`;
/** 영화 관련 회사 목록 */
const MovieCompanys = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0 70px;
`;
/** 영화 시청등급 */
const MovieGrade = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
/** 시청등급 이미지 */
const GradeImage = styled.img`
  width: 50px;
  height: 50px;
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
  const [moviePoster, setMoviePoster] = useState();
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
  const handleGenre = useCallback((genre) => {
    if (genre.length === 0) return "정보없음";
    let buf = [];
    for (let i = 0; i < genre.length; i++) {
      buf.push(genre[i].genreNm);
    }
    return buf.join(",");
  }, []);
  const handleActor = useCallback((actor) => {
    if (actor.length === 0) return "정보없음";
    let buf = [];
    for (let i = 0; i < actor.length; i++) {
      buf.push(actor[i].peopleNm);
    }
    return buf.join(", ");
  }, []);
  const handleCompany = useCallback((companys) => {
    if (companys.length === 0) return "정보없음";
    let buf = [];
    for (let i = 0; i < companys.length; i++) {
      buf.push(
        <Size20Wrap key={"companys" + i}>
          {companys[i].companyPartNm} : {companys[i].companyNm}
        </Size20Wrap>
      );
    }
    return buf;
  });
  const handleGrade = useCallback((grade) => {
    if (grade === "전체관람가")
      return (
        <GradeImage
          src={
            "https://i.namu.wiki/i/fpUOnicfOCodral8obFoPgHEKv8D0AwopM9hf_OYkbKK_zTsVCLkvpgNlxHn0faauC4KnMEwtDZ9FVNEiGubTCR364UPWK6FtS73DnZoCkN-4QtpAVzlO00iHiFUfmQ_j1Vrb891GhY47bcsMOQT2A.svg"
          }
        />
      );
    if (grade === "12세이상관람가")
      return (
        <GradeImage
          src={
            "https://i.namu.wiki/i/Cvav_S8tI-cqZfLsj0UPQjjZmXHbvc9R9mA6_J-MqMphc49Z3MBRaq3vDWX2AT9XqKBs7WSPIdzBSIB_eHZEHkVPUjXAtWpmw8bCK9Y0Du81fdphK1rdXyASvMHlZsCIPMU6sBr_PcGXPlLtEwaLgQ.svg"
          }
        />
      );
    if (grade === "15세이상관람가")
      return (
        <GradeImage
          src={
            "https://i.namu.wiki/i/PFua90aVqFkkR8zGNGV6SiH6NE5KZFxaGCuo86zDTn-IDHoY-JQ0dLPKbCmEdx5Xx7u5MRISCX-36wzqnvogVjbuH8HDM7pAAwxnQ6lxOrDAU5gilgsqbwT2F4bG64HmtxoItoNoX3B9dURM__xTeQ.svg"
          }
        />
      );
    if (grade === "청소년관람불가")
      return (
        <GradeImage
          src={
            "https://i.namu.wiki/i/HOXthrZVGdMv50-grpSa0S-eJRb10jro1QnWoqPeaRsbE0F3gHdIuYqeFkppGffWFHKO92ayes3jLTrua0o1KVFuJQDC0L-YU7o1hZyru1mMlWqMJ_rM0rxSx81MsSMn_k-3FyDXkakC0vg_s8Nujw.svg"
          }
        />
      );
  });
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
      NaverPoster(params[3]).then((vlaue) => {
        setMoviePoster(vlaue);
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
          <MovieInformatin>
            <MovieInformationPoster>
              <img src={moviePoster} alt=""></img>
            </MovieInformationPoster>
            <MovieInformationTexts>
              <Size40Bold
                style={{ width: "100%", borderBottom: "1px solid black" }}
              >
                {movieInfo.movieNm}
              </Size40Bold>
              <Size20Wrap>
                개봉일: {movieInfo?.openDt} 상영시간: {movieInfo?.showTm}분
                장르: {handleGenre(movieInfo.genres)}
              </Size20Wrap>
              <Size20>감독 : {movieInfo.directors[0]?.peopleNm}</Size20>
              <Size20Wrap>
                출연 배우 : {handleActor(movieInfo?.actors)}
              </Size20Wrap>
              <MovieCompanys>
                {handleCompany(movieInfo?.companys)}
              </MovieCompanys>
              <MovieGrade>
                {handleGrade(movieInfo.audits[0]?.watchGradeNm)}
              </MovieGrade>
            </MovieInformationTexts>
          </MovieInformatin>
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

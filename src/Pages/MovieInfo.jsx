import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { Size20, Size20Wrap, Size40Bold } from "../Components/TextFormat";
import { KobisInfo } from "../API/Artifact/KobisAPI";
import { NaverCafe, NaverPoster } from "../API/Artifact/NaverAPI";
import Loading from "../Components/Loading";
import { SiNaver } from "react-icons/si";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;
/** 영화 북마크 콘테이너 */
const MovieBookMarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 90vh;
  background-color: #f9f5eb;
  overflow-y: scroll;
  box-sizing: border-box;
  @media screen and (max-width: 950px) {
    margin-top: 110px;
  }
  @media screen and (max-width: 550px) {
    margin-top: 80px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 0 0 10px 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: gray;
  }
`;
/** 북마크 리스트 header */
const MovieBookMarkHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: black;
  font-size: 40px;
  font-weight: bold;
  font-family: "CM";
  background-color: #e4dccf;
  position: sticky;
  top: 0;
  @media screen and (max-width: 1000px) {
    font-size: 35px;
  }
`;
/** 북마크 콘텐츠 */
const MovieMarks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  :hover {
    border: 1px solid black;
    border-bottom: 2px solid black;
  }
`;
/** 북마크 제목 */
const MovieMarkTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  max-width: 90%;
  font-size: 25px;
  font-family: "CM";
  padding-left: 20px;
  white-space: nowrap;
  box-sizing: border-box;
  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;
/** 북마크 표시 */
const MovieMarkCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 50px;
`;
/** 북마크 추가용 Item */
const AddBookMark = styled.div`
  transition: 200ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  font-size: 35px;
  color: #2192ff;
  animation: colorTransform 5s ease-in-out infinite;
  @keyframes colorTransform {
    0% {
      color: #2192ff;
    }
    50% {
      color: #ff85b3;
    }
    100% {
      color: #2192ff;
    }
  }
  :hover {
    scale: 1.01;
  }
  @media screen and (max-width: 1000px) {
    font-size: 20px;
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
  box-sizing: border-box;
  @media screen and (max-width: 950px) {
    margin-top: 110px;
    width: 100%;
    padding-bottom: 200px;
  }
  @media screen and (max-width: 550px) {
    margin-top: 80px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: gray;
    border-radius: 10px;
  }
`;
/** 영화 설명 콘테이너 */
const MovieInformatin = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  max-width: 900px;
  height: fit-content;
  margin: 20px 0 40px;
  border: 1px solid black;
  border-radius: 5px;
  @media screen and (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    width: 75%;
  }
`;
/** 영화 포스터 콘테이너 */
const MovieInformationPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 400px;
  height: 100%;
  overflow: hidden;
  margin: 10px;
  @media screen and (max-width: 1400px) {
    align-items: center;
    width: 90%;
  }
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
  max-width: 900px;
  @media screen and (max-width: 500px) {
    width: 75%;
  }
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
  :hover {
    border: 1px solid black;
    border-bottom: 2px solid black;
  }
  @media screen and (max-width: 700px) {
    height: 50px;
  }
`;
/** 영화 정보 사이트 링크들 */
const MovieInfoSites = styled.div`
  transition: 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
  padding: 20px 10px;
  gap: 30px;
  border: 2px solid black;
  border-radius: 10px;
  position: fixed;
  top: 50px;
  right: 70px;
  box-sizing: border-box;
  background-color: white;
  @media screen and (max-width: 1150px) {
    gap: 20px;
    right: 35px;
  }
  @media screen and (max-width: 950px) {
    top: 160px;
  }
  @media screen and (max-width: 930px) {
    width: 52px;
    gap: 10px;
    padding: 0;
  }
  @media screen and (max-width: 815px) {
    right: 15px;
    width: 40px;
    gap: 0px;
    padding: 0;
  }
`;
/** 영화 정보 사이트 링크 버튼 */
const MovieInfoSiteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  max-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 40px;
  height: fit-content;
  background-color: ${(props) => {
    return props.bgColor !== undefined ? "#" + props.bgColor : "";
  }};
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  :active {
    scale: 0.98;
  }
  @media screen and (max-width: 930px) {
    scale: 0.7;
  }
  @media screen and (max-width: 815px) {
    scale: 0.5;
  }
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
      if (i === 12) {
        buf.push("...");
        break;
      }
    }
    return buf.join(", ");
  }, []);
  const handleActorTitle = useCallback((actor) => {
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
  }, []);
  const handleBookMark = useCallback(
    (paramsCd, paramsNm) => {
      let Marked = false;
      if (movieList?.length !== 0) {
        for (let i = 0; i < movieList?.length; i++) {
          if (movieList[i].movieCd === paramsCd) {
            Marked = true;
            break;
          }
        }
      }
      return Marked ? (
        <AiFillStar
          color="FFEA20"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleRemoveStorage(paramsCd);
          }}
        />
      ) : (
        <AiOutlineStar
          color="8DCBE6"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleAddStorage(paramsCd, paramsNm);
          }}
        />
      );
    },
    [movieList]
  );
  const handleAddStorage = useCallback(
    (paramsCd, paramsNm) => {
      setMovieList((movieList) => {
        return [...movieList, { movieCd: paramsCd, movieNm: paramsNm }];
      });
    },
    [movieList]
  );
  const handleRemoveStorage = useCallback(
    (paramsCd) => {
      let origin = movieList;
      let buf = [];
      for (let i = 0; i < origin.length; i++) {
        if (origin[i].movieCd === paramsCd) {
          buf = [origin.slice(0, i), origin.slice(i + 1)].flat();
          break;
        }
      }
      setMovieList(buf);
    },
    [movieList]
  );
  const MovieListGen = useCallback(() => {
    if (movieList?.length === 0) {
      return (
        <Link
          to={"/MovieInfo/search"}
          key={"add bookmark Link"}
          style={{
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddBookMark key={"add bookmark button"}>
            Click Here To Add More Movies!
          </AddBookMark>
        </Link>
      );
    }
    let contents = [];
    for (let i = 0; i < movieList?.length; i++) {
      contents.push(
        <MovieMarks key={"movie marks" + i}>
          <Link
            to={`/MovieInfo/movie-info?movieCd=${movieList[i].movieCd}&title=${movieList[i].movieNm}`}
            key={"Link Item" + i}
            style={{ width: "90%", overflow: "hidden" }}
          >
            <MovieMarkTitle
              title={decodeURI(movieList[i].movieNm)}
              key={"mark title" + i}
            >
              {decodeURI(movieList[i].movieNm)}
            </MovieMarkTitle>
          </Link>
          <MovieMarkCheck key={"mark check" + i}>
            {handleBookMark(movieList[i].movieCd, movieList[i].movieNm)}
          </MovieMarkCheck>
        </MovieMarks>
      );
    }
    contents.push(
      <Link to={"/MovieInfo/search"} key={"add bookmark Link"}>
        <AddBookMark key={"add bookmark button"}>
          Click Here To Add More Movies!
        </AddBookMark>
      </Link>
    );
    return contents;
  }, [movieList]);
  useEffect(() => {
    if (movieList === undefined) {
      setMovieList(JSON.parse(window.localStorage.getItem("movieList")));
    }
    if (
      params.length !== 1 &&
      movieInfo === undefined &&
      movieCafe === undefined &&
      moviePoster === undefined
    ) {
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
    if (movieList !== undefined) {
      window.localStorage.setItem("movieList", JSON.stringify(movieList));
    }
  }, [movieList, params]);
  return (
    <Container onScroll={() => {}}>
      {mode === "list" ? (
        <MovieBookMarkContainer>
          <MovieBookMarkHeader>BOOK MARKS</MovieBookMarkHeader>
          {MovieListGen()}
        </MovieBookMarkContainer>
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
              <Size20Wrap>감독 : {movieInfo.directors[0]?.peopleNm}</Size20Wrap>
              <Size20Wrap title={handleActorTitle(movieInfo?.actors)}>
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
          <MovieInfoCafe style={{ marginBottom: "20px" }}>
            {CafeItemGen()}
          </MovieInfoCafe>
          <MovieInfoSites>
            <MovieInfoSiteButton bgColor="2db400" color="ffffff">
              <Link
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
                to={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${params[3]}`}
                target="_blank"
              >
                <SiNaver />
              </Link>
            </MovieInfoSiteButton>
            <MovieInfoSiteButton>
              <Link
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
                to={`https://namu.wiki/w/${params[3]}`}
                target="_blank"
              >
                <img
                  src="https://jwiki.kr/wiki/images/thumb/d/d5/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4_%EC%95%84%EC%9D%B4%EC%BD%98.png/200px-%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4_%EC%95%84%EC%9D%B4%EC%BD%98.png"
                  alt=""
                  style={{ width: "55px" }}
                />
              </Link>
            </MovieInfoSiteButton>
            <MovieInfoSiteButton>
              <Link
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
                to={`https://movie.daum.net/search?q=${params[3]}#tab=all`}
                target="_blank"
              >
                <img
                  src="https://t1.daumcdn.net/liveboard/profile/daum_notice.png"
                  alt=""
                  style={{ width: "70px" }}
                />
              </Link>
            </MovieInfoSiteButton>
            <MovieInfoSiteButton>
              <Link
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
                to={`https://www.google.com/search?q=${params[3]}`}
                target="_blank"
              >
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                  style={{ width: "80px" }}
                />
              </Link>
            </MovieInfoSiteButton>
            <MovieInfoSiteButton>
              {handleBookMark(params[1], params[3])}
            </MovieInfoSiteButton>
          </MovieInfoSites>
        </MovieInfoContainer>
      )}
    </Container>
  );
}

export default MovieInfo;

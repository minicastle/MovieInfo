import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Size20, Size40Bold, Size80Bold } from "../Components/TextFormat";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsFillPauseFill, BsFillPlayFill, BsDash } from "react-icons/bs";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import Carousel from "../Components/Carousel";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 30px;
  box-sizing: border-box;
  @media screen and (max-width: 1450px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 5px;
  }
  a {
    color: white;
  }
`;
/** 메인 콘텐츠 콘테이너 1 */
const Main1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;
/** 포스터 콘테이너 */
const PosterContainer = styled.div`
  margin-top: 39px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 467px;
  height: 700px;
  border-radius: 15px;
  background-color: #fefae0;
  padding: 40px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 1450px) {
    width: 467px;
    height: 500px;
  }
  @media screen and (max-width: 795px) {
    width: 400px;
  }
`;
/** 캐러셀 자동 실행 컨트롤 */
const CarouselAuto = styled.div`
  font-size: 50px;
  position: absolute;
  top: 0;
  right: 0;
`;
/** 포스터 컨트롤러 */
const PosterControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  margin-top: 10px;
  @media screen and (max-width: 795px) {
    gap: 10px;
  }
`;
/** 포스터 네비게이션 Dot */
const PosterDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => {
    return "#" + props.bgColor;
  }};
`;
/** 메인 콘텐츠 콘테이너 2 */
const Main2 = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media screen and (max-width: 915px) {
    width: 500px;
  }
  @media screen and (max-width: 820px) {
    width: 400px;
  }
`;
/** rank 콘텐츠 콘테이너 */
const RankContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 868px;
  background-color: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  box-sizing: border-box;
  @media screen and (max-width: 1450px) {
    margin-bottom: 50px;
    height: 560px;
  }
`;
/**rank 콘텐츠 아이템 */
const RankItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  background-color: ${(props) => {
    return "#" + props.bgColor;
  }};
  height: 78px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  @media screen and (max-width: 1450px) {
    height: 50px;
  }
`;
/** rank 아이템 번호 */
const RankNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
  user-select: none;
`;
/** rank 아이템 제목 */
const RankTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 48%;
  font-weight: 700;
  @media screen and (max-width: 820px) {
    width: 75%;
  }
`;
/** rank 아이템 순위변동 */
const RankInten = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 12%;
  user-select: none;
  @media screen and (max-width: 820px) {
    width: 15%;
  }
`;
/** rank 아이템 누적관객수 */
const RankViewer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  user-select: none;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
/** rank 아이템 신규상영영화 */
const RankNew = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
  user-select: none;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

function DailyPage({ dailyData }) {
  const [movieNumber, setMovieNumber] = useState(1);
  const [play, setPlay] = useState(true);
  const now = new Date();
  const year = now.getFullYear();
  const month =
    String(now.getMonth() + 1).length === 2
      ? now.getMonth() + 1
      : "0" + (now.getMonth() + 1);
  const date =
    String(now.getDate()).length === 2 ? now.getDate() : "0" + now.getDate();
  const dotGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < 10; i++) {
      contents.push(
        <PosterDot
          onClick={() => {
            setMovieNumber(i + 1);
            if (play) {
              setPlay(false);
            }
          }}
          key={`PosterDot${i}`}
          bgColor={movieNumber === i + 1 ? "000000" : "aaaaaa"}
        />
      );
    }
    return contents;
  }, [movieNumber]);
  const RankItemGen = useCallback(
    (e) => {
      let contents = [];
      for (let i = 0; i < e.length; i++) {
        contents.push(
          <Link
            to={`/MovieInfo/movie-info?movieCd=${e[i].movieCd}&title=${e[i].movieNm}`}
            key={"RankItemLinkInfo" + i}
            style={{ width: "100%" }}
          >
            <RankItem
              key={`RankItem${i}`}
              bgColor={movieNumber === i + 1 ? "F7F5EB" : "ffffff"}
            >
              <RankNumber key={`RankItemNumber${i}`}>
                <Size20 key={`RankItemNumberText${i}`}>{e[i].rank}</Size20>
              </RankNumber>
              <RankTitle title={e[i].movieNm} key={`RankItemTitle${i}`}>
                <Size20 key={`RankItemTitleText${i}`}>{e[i].movieNm}</Size20>
              </RankTitle>
              <RankInten key={`RankItemInten${i}`}>
                <Size20 key={`RankItemIntenText${i}`}>
                  {Number(e[i].rankInten) < 0 ? (
                    <>
                      <RxDoubleArrowDown color="332FD0" />
                      {Number(e[i].rankInten) * -1}
                    </>
                  ) : Number(e[i].rankInten) === 0 ? (
                    <BsDash color="379237" fontSize={"30px"} />
                  ) : (
                    <>
                      <RxDoubleArrowUp color="E90064" />
                      {e[i].rankInten}
                    </>
                  )}
                </Size20>
              </RankInten>
              <RankViewer key={`RankItemViewer${i}`}>
                <Size20 key={`RankItemViewerText${i}`}>{e[i].audiAcc}</Size20>
              </RankViewer>
              <RankNew key={`RankItemNew${i}`}>
                <Size20 key={`RankItemNewText${i}`}>
                  {e[i].rankOldAndNew}
                </Size20>
              </RankNew>
            </RankItem>
          </Link>
        );
      }
      return contents;
    },
    [movieNumber, dailyData]
  );

  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (play === true && dailyData !== undefined) {
        movieNumber !== 10
          ? setMovieNumber(movieNumber + 1)
          : setMovieNumber(1);
      }
    }, 5000);

    return () => {
      clearInterval(autoPlay);
    };
  }, [play, movieNumber]);
  return (
    <>
      {dailyData === undefined ? (
        <Container>
          <Loading></Loading>
        </Container>
      ) : (
        <Container>
          <Main1>
            <Size80Bold
              color="332FD0"
              style={{ textShadow: "2px 4px 4px rgba(0,0,0,0.4)" }}
            >
              BOX OFFICE
            </Size80Bold>
            <PosterContainer>
              <Carousel dailyData={dailyData} movieNumber={movieNumber} />
              <CarouselAuto>
                {play ? (
                  <BsFillPauseFill
                    onClick={() => {
                      setPlay(!play);
                    }}
                  />
                ) : (
                  <BsFillPlayFill
                    onClick={() => {
                      setPlay(!play);
                    }}
                  />
                )}
              </CarouselAuto>
            </PosterContainer>
            <PosterControl>
              <IoIosArrowBack
                color="F24E1E"
                fontSize={"50px"}
                onClick={() => {
                  movieNumber === 1
                    ? setMovieNumber(10)
                    : setMovieNumber(movieNumber - 1);
                  if (play) {
                    setPlay(false);
                  }
                }}
              />
              {dotGen()}
              <IoIosArrowForward
                color="F24E1E"
                fontSize={"50px"}
                onClick={() => {
                  movieNumber === 10
                    ? setMovieNumber(1)
                    : setMovieNumber(movieNumber + 1);
                  if (play) {
                    setPlay(false);
                  }
                }}
              />
            </PosterControl>
          </Main1>
          <Main2>
            <Size40Bold color="332FD0" style={{ marginBottom: "10px" }}>
              {year}.{month}.{date}
            </Size40Bold>
            <RankContents>
              <RankItem>
                <RankNumber
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Size20>순위</Size20>
                </RankNumber>
                <RankTitle
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Size20>영화 제목</Size20>
                </RankTitle>
                <RankInten>
                  <Size20
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    변동률
                  </Size20>
                </RankInten>
                <RankViewer>
                  <Size20
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    누적 관객
                  </Size20>
                </RankViewer>
                <RankNew>
                  <Size20
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    신규
                  </Size20>
                </RankNew>
              </RankItem>
              {RankItemGen(dailyData)}
            </RankContents>
          </Main2>
        </Container>
      )}
    </>
  );
}

export default DailyPage;

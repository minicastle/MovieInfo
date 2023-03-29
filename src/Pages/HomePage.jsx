import React from "react";
import styled from "@emotion/styled";
import { Size30Bold, Size80Bold } from "../Components/TextFormat";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const ContentsSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 5%;
  margin-top: 40px;
  flex-wrap: wrap;
`;
const Contents = styled.div`
  transition: 100ms ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  max-width: 335px;
  height: 20vw;
  max-height: 335px;
  background-color: white;
  margin-bottom: 30px;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  :hover {
    scale: 1.01;
  }
`;
const ContentsImage = styled.img`
  width: 98%;
`;
const ContentsImageBlender = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;
const ContentsTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

function HomePage() {
  return (
    <Container>
      <Size80Bold>Home</Size80Bold>
      <ContentsSelector>
        <Contents>
          <Link
            to={"/MovieInfo/daily"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="./images/boxOfficeRank.png" alt="" />
            <ContentsImageBlender />
            <ContentsTitle>
              <Size30Bold color="400D51">Box Office Rank</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="400D51" />
            </ContentsTitle>
          </Link>
        </Contents>
        <Contents>
          <Link
            to={"/MovieInfo/search"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="./images/searchIcon.png" alt="" />
            <ContentsTitle>
              <Size30Bold color="576CBC">Movie Search</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="576CBC" />
            </ContentsTitle>
          </Link>
        </Contents>
        <Contents>
          <Link
            to={"/MovieInfo/update"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="" alt="" />
            <ContentsImageBlender />
            <ContentsTitle>
              <Size30Bold color="FF5F9E">New Update Movie</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="FF5F9E" />
            </ContentsTitle>
          </Link>
        </Contents>
        <Contents>
          <Link
            to={"/MovieInfo/movie-info"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="./images/movieInfo.png" alt="" />
            <ContentsImageBlender />
            <ContentsTitle>
              <Size30Bold color="19376D">Movie Information</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="19376D" />
            </ContentsTitle>
          </Link>
        </Contents>
        <Contents>
          <Link
            to={"/MovieInfo/question"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="" alt="" />
            <ContentsImageBlender />
            <ContentsTitle>
              <Size30Bold color="FF4949">Q & A</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="FF4949" />
            </ContentsTitle>
          </Link>
        </Contents>
        <Contents>
          <Link
            to={"/MovieInfo/site-info"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentsImage src="" alt="" />
            <ContentsImageBlender />
            <ContentsTitle>
              <Size30Bold color="B3005E">Site Information</Size30Bold>
              <HiArrowNarrowRight fontSize={"50px"} color="B3005E" />
            </ContentsTitle>
          </Link>
        </Contents>
      </ContentsSelector>
    </Container>
  );
}

export default HomePage;

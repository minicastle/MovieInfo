import React from "react";
import styled from "@emotion/styled";
import { Size30Bold, Size80Bold } from "../Components/TextFormat";
import { HiArrowNarrowRight } from "react-icons/hi";

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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vw;
  background-color: white;
  margin-bottom: 30px;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
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
          <ContentsImage src="./images/boxOfficeRank.png" alt="" />
          <ContentsImageBlender />
          <ContentsTitle>
            <Size30Bold color="400D51">Box Office Rank</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="400D51" />
          </ContentsTitle>
        </Contents>
        <Contents>
          <ContentsImage src="./images/searchIcon.png" alt="" />
          <ContentsTitle>
            <Size30Bold color="16FF00">Movie Search</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="16FF00" />
          </ContentsTitle>
        </Contents>
        <Contents>
          <ContentsImage src="" alt="" />
          <ContentsImageBlender />
          <ContentsTitle>
            <Size30Bold color="FF5F9E">New Update Movie</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="FF5F9E" />
          </ContentsTitle>
        </Contents>
        <Contents>
          <ContentsImage src="./images/movieInfo.png" alt="" />
          <ContentsImageBlender />
          <ContentsTitle>
            <Size30Bold color="54B435">Movie Information</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="54B435" />
          </ContentsTitle>
        </Contents>
        <Contents>
          <ContentsImage src="" alt="" />
          <ContentsImageBlender />
          <ContentsTitle>
            <Size30Bold color="FF4949">Q & A</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="FF4949" />
          </ContentsTitle>
        </Contents>
        <Contents>
          <ContentsImage src="" alt="" />
          <ContentsImageBlender />
          <ContentsTitle>
            <Size30Bold color="B3005E">Site Information</Size30Bold>
            <HiArrowNarrowRight fontSize={"50px"} color="B3005E" />
          </ContentsTitle>
        </Contents>
      </ContentsSelector>
    </Container>
  );
}

export default HomePage;

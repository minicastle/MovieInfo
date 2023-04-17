import React from "react";
import styled from "@emotion/styled";
import {
  Size40BoldWrap,
  Size80Bold,
  TitleFont,
} from "../Components/TextFormat";
import { Link } from "react-router-dom";
import {
  BsBookmarkStar,
  BsGithub,
  BsGraphUpArrow,
  BsSearch,
  BsCodeSlash,
} from "react-icons/bs";
import { MdHttps, MdOutlineLocalFireDepartment } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { BiCameraMovie } from "react-icons/bi";

const SiteInfoIcon = {
  margin: "0 10px",
  padding: "8px",
  borderRadius: "5px",
  color: "#E90064",
  backgroundColor: "#FFFFD0",
};
const CreatorInfoIcon = {
  margin: "0 10px",
  padding: "8px",
  borderRadius: "5px",
  color: "#5800FF",
  backgroundColor: "#FFFFD0",
  fontSize: "30px",
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
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
/** 메인 header 콘테이너 */
const MainHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  box-sizing: border-box;
  margin-top: 100px;
  padding-bottom: 50px;
  border-bottom: 5px solid gray;
`;
/** 메인 header 네비게이션 아이콘 콘테이너 */
const MainHeaderNavIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 80px;
  margin-top: 20px;
`;
/** 네비게이션 아이콘 */
const NavIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: "JS";
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
`;
/** 사이트 설명 Item 콘테이너 */
const SiteInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  border-bottom: 5px solid gray;
  padding: 80px 0;
`;
/** 사이트 설명 Item */
const InfoItem = styled.div`
  border-radius: 20px;
  width: 30%;
  max-width: 400px;
  min-width: 350px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  gap: 20px;
  word-break: keep-all;
  box-sizing: border-box;
`;
/** 사이트 설명 Item icon */
const InfoItemIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-family: "CM";
`;
/** 제작자 설명 Item 콘테이너 */
const CreatorInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 80px 0;
`;
/** 제작자 설명 Item */
const CreatorInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  min-width: 350px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  font-size: 20px;
  gap: 20px;
  word-break: keep-all;
  box-sizing: border-box;
`;
/** Link Button */
const LinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: "CM";
  font-weight: bold;
  color: white;
  background-color: #0096ff;
  padding: 10px 20px;
  border-radius: 20px;
`;
function SiteInfoPage() {
  return (
    <Container>
      <MainHeaderContainer>
        <TitleFont color="0F6292" style={{ width: "100%" }}>
          MOVER
          <Size40BoldWrap color="0F6292">For Movie Lovers</Size40BoldWrap>
        </TitleFont>
        <Size80Bold
          color="E384FF"
          style={{
            fontFamily: "JS",
            textShadow: "3px 2px 8px black",
            width: "100%",
          }}
        >
          BoxOfficeRank & BookMark
        </Size80Bold>
        <MainHeaderNavIcons>
          <NavIcon style={{ backgroundColor: "#A555EC" }}>
            <Link to={"/MovieInfo/daily"}>오늘의 영화</Link>
          </NavIcon>
          <NavIcon>
            <Link to={"/MovieInfo/search"}>영화 검색</Link>
          </NavIcon>
          <NavIcon>
            <Link to={"/MovieInfo/movie-info"}>북마크</Link>
          </NavIcon>
        </MainHeaderNavIcons>
      </MainHeaderContainer>
      <Size80Bold color="E90064">Site Info</Size80Bold>
      <SiteInformationContainer>
        <InfoItem>
          <InfoItemIcon>
            <BsGraphUpArrow style={SiteInfoIcon} /> 오늘의 영화
          </InfoItemIcon>
          Kobis와 Naver의 API를 이용한 서비스로 BoxOffice 순위 10위내에 랭크된
          영화의 정보와 포스터를 불러옵니다.
        </InfoItem>
        <InfoItem>
          <InfoItemIcon>
            <BsSearch style={SiteInfoIcon} />
            영화 검색
          </InfoItemIcon>
          Kobis API를 이용해 제목을 기반으로 데이터 베이스 내에서 10개의 영화
          정보를 불러와 영화의 상세정보를 볼수있습니다.
        </InfoItem>
        <InfoItem>
          <InfoItemIcon>
            <BsBookmarkStar style={SiteInfoIcon} />
            영화 정보 & 북마크
          </InfoItemIcon>
          Kobis와 Naver의 API를 이용해 영화의 정보와 Naver Cafe의 후기 내용을
          불러옵니다. 또한 북마크 리스트에 추가할수 있습니다.
        </InfoItem>
        <InfoItem>
          <InfoItemIcon>
            <RiMovie2Line style={SiteInfoIcon} />
            이번달 신규영화
          </InfoItemIcon>
          Kobis API를 이용해 개봉일자가 이번달에 개봉 혹은 개봉예정인 작품을
          불러와 개봉일자와 제목 등을 보여주는 서비스입니다.
        </InfoItem>
        <InfoItem>
          <InfoItemIcon>
            <MdHttps style={SiteInfoIcon} />
            서버 프록시
          </InfoItemIcon>
          CORS에러를 해결하기 위해 Heroku에 CORS 프록시 서버를 제작해 Git
          Pages에 적용후에도 사이트를 사용할수 있게 제작하였습니다.
        </InfoItem>
        <InfoItem>
          <InfoItemIcon>
            <MdOutlineLocalFireDepartment style={SiteInfoIcon} />
            LocalStorage를 이용한 최적화
          </InfoItemIcon>
          LocalStorage를 이용해 데이터 저장해 반응 시간과 API사용 빈도를 낮춰
          네트워크 부담과 서비스속도를 향상 시켰습니다.
        </InfoItem>
      </SiteInformationContainer>
      <Size80Bold color="5800FF">Creator Info</Size80Bold>
      <CreatorInformationContainer>
        <CreatorInfoItem>
          <InfoItemIcon>
            <BsGithub style={CreatorInfoIcon} />
            제작자 GitHub
          </InfoItemIcon>
          <Link to={"https://github.com/minicastle"} target="_blank">
            <LinkButton>View</LinkButton>
          </Link>
        </CreatorInfoItem>
        <CreatorInfoItem>
          <InfoItemIcon>
            <BsCodeSlash style={CreatorInfoIcon} />
            Source Code
          </InfoItemIcon>
          <Link to={"https://github.com/minicastle/MovieInfo"} target="_blank">
            <LinkButton>View</LinkButton>
          </Link>
        </CreatorInfoItem>
        <CreatorInfoItem>
          <InfoItemIcon>
            <SiNaver style={CreatorInfoIcon} />
            Naver API
          </InfoItemIcon>
          <Link
            to={"https://developers.naver.com/products/intro/plan/plan.md"}
            target="_blank"
          >
            <LinkButton>View</LinkButton>
          </Link>
        </CreatorInfoItem>
        <CreatorInfoItem>
          <InfoItemIcon>
            <BiCameraMovie style={CreatorInfoIcon} />
            Kobis API
          </InfoItemIcon>
          <Link
            to={"https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do"}
            target="_blank"
          >
            <LinkButton>View</LinkButton>
          </Link>
        </CreatorInfoItem>
      </CreatorInformationContainer>
    </Container>
  );
}

export default SiteInfoPage;

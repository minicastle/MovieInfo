import React from "react";
import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { Link } from "react-router-dom";

const Container = styled.div`
  transition: 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 370px;
  min-width: 300px;
  background-color: #f7c8e0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px #3fa086;
  a {
    text-decoration: none;
  }
  @media screen and (max-width: 950px) {
    position: absolute;
    top: 0;
    right: ${(props) => {
      return props.minimize ? "-370px" : "0px";
    }};
  }
  z-index: 99;
`;
/** 로고 콘테이너 */
const Logo = styled.img`
  cursor: pointer;
  width: 100%;
  transition: 300ms ease-in-out;
  background-color: #f7c8e0;
  box-shadow: 0 0 0 #7286d3;
  :hover {
    scale: 1.01;
    animation: hoverShadow 0.3s ease-in-out both;
    animation-delay: 100ms;
    background-color: #7286d3;
  }
  :active {
    scale: 1;
  }
  @keyframes hoverShadow {
    from {
      box-shadow: 0 0 0 #7286d3;
    }
    to {
      box-shadow: 0 0 3000px 3000px #7286d3;
    }
  }
  @media screen and (max-width: 950px) {
    width: 0;
  }
`;
/** Navbar 아이템 콘테이너 */
const NavList = styled.ul`
  list-style: none;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  gap: 30px;
  z-index: 2;
  @media screen and (max-width: 950px) {
    margin-top: 150px;
    gap: 50px;
  }
`;
/**Navbar 아이템 */
const NavItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
  font-size: 40px;
  color: ${(props) => {
    return "#" + props.color;
  }};
  text-shadow: 2px 4px 4px gray;
  user-select: none;
  :hover {
    color: #b9f3e4;
  }
`;
/**제작자 소개 (footer) */
const Footer = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  bottom: 0;
`;
/**제작자 소개 형식 */
const FooterItem = styled.li`
  font-size: 20px;
  user-select: none;
  color: #7286d3;
  z-index: 2;
`;
/**제작자 아이콘 형식 */
const FooterIcon = styled.li`
  cursor: pointer;
  font-size: 30px;
  color: #7286d3;
  :hover {
    color: #89a0ff;
  }
`;

function NavBar({ page = "home", minimize = true, handleMinimize }) {
  return (
    <Container minimize={minimize}>
      <Link to="/">
        <Logo src="./MoverLogo.png" />
      </Link>
      <NavList>
        <Link
          to="/MovieInfo/daily"
          onClick={() => {
            handleMinimize();
          }}
        >
          <NavItem color={page === "daily" ? "B9F3E4" : "FFAACF"}>
            Daily
          </NavItem>
        </Link>
        <Link
          to="/MovieInfo/search"
          onClick={() => {
            handleMinimize();
          }}
        >
          <NavItem color={page === "search" ? "B9F3E4" : "FFAACF"}>
            Search
          </NavItem>
        </Link>
        <Link
          to="/MovieInfo/update"
          onClick={() => {
            handleMinimize();
          }}
        >
          <NavItem color={page === "update" ? "B9F3E4" : "FFAACF"}>
            Month Update
          </NavItem>
        </Link>
        <Link
          to="/MovieInfo/movie-info"
          onClick={() => {
            handleMinimize();
          }}
        >
          <NavItem color={page === "movie-info" ? "B9F3E4" : "FFAACF"}>
            Movie Info
          </NavItem>
        </Link>
        <Link
          to="/MovieInfo/question"
          onClick={() => {
            handleMinimize();
          }}
        >
          <NavItem color={page === "question" ? "B9F3E4" : "FFAACF"}>
            Q&A
          </NavItem>
        </Link>
      </NavList>
      <Footer>
        <FooterIcon>
          <Link to={"https://github.com/minicastle"} target="_blank">
            <BsGithub color="7286d3" />
          </Link>
        </FooterIcon>
        <FooterIcon>
          <Link to={"https://github.com/minicastle/MovieInfo"} target="_blank">
            <MdOutlineDeveloperMode color="7286d3" />
          </Link>
        </FooterIcon>
        <FooterItem>Made By.MiniCastle</FooterItem>
      </Footer>
    </Container>
  );
}

export default NavBar;

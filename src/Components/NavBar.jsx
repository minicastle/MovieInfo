import React from 'react';
import styled from '@emotion/styled';
import {BsGithub} from 'react-icons/bs';
import {MdOutlineDeveloperMode} from 'react-icons/md';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 370px;
    background-color: #F7C8E0;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 10px #3fa086;
    a{
        text-decoration: none;
    }
`;
/** 로고 콘테이너 */
const Logo = styled.img`
    cursor: pointer;
    width: 100%;
    transition: 300ms ease-in-out;
    background-color: #F7C8E0;
    box-shadow: 0 0 0 #7286D3;
    :hover{
        scale: 1.01;
        animation: hoverShadow 0.3s ease-in-out both;
        animation-delay: 100ms;
        background-color: #7286D3;
    }
    :active{
        scale: 1;
    }
    @keyframes hoverShadow {
        from{
            box-shadow: 0 0 0 #7286D3;
        }
        to{
            box-shadow: 0 0 3000px 3000px #7286D3;
        }
        
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
`;
/**Navbar 아이템 */
const NavItem = styled.li`
    cursor: pointer;
    white-space: nowrap;
    font-size: 40px;
    color: ${(props)=>{return '#'+props.color}};
    text-shadow: 2px 4px 4px gray;
    user-select: none;
    :hover{
        color:#B9F3E4;
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
    position: fixed;
    bottom: 0;
`;
/**제작자 소개 형식 */
const FooterItem = styled.li`
    font-size: 20px;
    user-select: none;
    color: #7286D3;
    z-index: 2;
`;
/**제작자 아이콘 형식 */
const FooterIcon = styled.li`
    cursor: pointer;
    font-size: 30px;
    color: #7286D3;
    :hover{
        color: #89a0ff;
    }
`;

function NavBar({page='home'}) {
    return (
        <Container>
            <Link to='/' ><Logo src='./MoverLogo.png'/></Link>
            <NavList>
                <Link to='/daily'><NavItem color={page==='daily'?"B9F3E4":"FFAACF"}>Daily</NavItem></Link>
                <Link to='/search' ><NavItem color={page==='search'?"B9F3E4":"FFAACF"}>Search</NavItem></Link>
                <Link to='/update' ><NavItem color={page==='update'?"B9F3E4":"FFAACF"}>Month Update</NavItem></Link>
                <Link to='/movie-info' ><NavItem color={page==='movie-info'?"B9F3E4":"FFAACF"}>Movie Info</NavItem></Link>
                <Link to='/question' ><NavItem color={page==='question'?"B9F3E4":"FFAACF"}>Q&A</NavItem></Link>
                <Link to='/site-info' ><NavItem color={page==='site-info'?"B9F3E4":"FFAACF"}>Site Info</NavItem></Link>
            </NavList>
            <Footer>
                <FooterIcon><BsGithub/></FooterIcon>
                <FooterIcon><MdOutlineDeveloperMode/></FooterIcon>
                <FooterItem>Made By.MiniCastle</FooterItem>
            </Footer>
        </Container>
    )
}

export default NavBar
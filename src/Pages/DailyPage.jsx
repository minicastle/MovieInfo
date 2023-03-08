import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Size80Bold } from '../Components/TextFormat';
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    height: 706px;
    border-radius: 15px;
    background-color: white;
    padding: 40px 8px;
    box-sizing: border-box;
    position: relative;
`;
/** 포스터 이미지 */
const PosterImage = styled.img`
    width: 100%;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.4);
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
`;
/** 포스터 네비게이션 Dot */
const PosterDot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props)=>{return '#'+props.bgColor}};
`;
/** 메인 콘텐츠 콘테이너 2 */
const Main2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
`;
function DailyPage() {
    const [movieNumber,setMovieNumber] = useState(1);
    const [play,setPlay] = useState(true);
    const dotGen = useCallback(()=>{
        let contents = [];
        for(let i = 0; i<10; i++){
            contents.push(<PosterDot onClick={()=>{setMovieNumber(i+1)}} key={`PosterDot${i}`} bgColor={movieNumber===i+1?'000000':'aaaaaa'}/>)
        }
        return contents;
    });
    return (
        <Container>
            <Main1>
                <Size80Bold color='332FD0'
                style={{textShadow:'2px 4px 4px rgba(0,0,0,0.4)'}}
                >BOX OFFICE</Size80Bold>
                <PosterContainer>
                    <PosterImage src='./images/poster ex.jpg'></PosterImage>
                    <CarouselAuto>
                        {play?
                        <BsFillPauseFill onClick={()=>{setPlay(!play)}}/>
                        :<BsFillPlayFill onClick={()=>{setPlay(!play)}}/>}
                    </CarouselAuto>
                </PosterContainer>
                <PosterControl>
                    <IoIosArrowBack color='F24E1E' fontSize={'50px'} onClick={()=>{
                        movieNumber===1?setMovieNumber(10):setMovieNumber(movieNumber-1);
                        setPlay(false);
                    }}/>
                    {dotGen()}
                    <IoIosArrowForward color='F24E1E' fontSize={'50px'} onClick={()=>{
                        movieNumber===10?setMovieNumber(1):setMovieNumber(movieNumber+1);
                        setPlay(false);
                    }}/>
                </PosterControl>
            </Main1>
            <Main2></Main2>
        </Container>
    )
}

export default DailyPage
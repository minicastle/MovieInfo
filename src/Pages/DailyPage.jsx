import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Size20, Size40Bold, Size80Bold } from '../Components/TextFormat';
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 30px;
`;
/** error 방지용 Loading data */
const LoadingData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoadingLogo = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: rotateImg 2.5s ease-in-out infinite;
    @keyframes rotateImg {
        from{
            transform: rotateZ(0deg);
        }
        to{
            transform: rotateZ(360deg);
        }
    }
`;
const LoadingText = styled.div`
    background-color: #EA8FEA;
    color: white;
    font-size: 30px;
    font-weight: bold;
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
    width: 600px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
/** rank 콘텐츠 콘테이너 */
const RankContents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 100%;
    height: 860px;
    background-color: white;
    box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
    border-radius: 15px;
    padding: 15px 0;
    box-sizing: border-box;
`;
/**rank 콘텐츠 아이템 */
const RankItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    background-color: ${(props)=>{return '#'+props.bgColor}};
    height: 78px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
`;
/** rank 아이템 번호 */
const RankNumber = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 78px;
    user-select: none;
`;
/** rank 아이템 제목 */
const RankTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 260px;
`;
/** rank 아이템 순위변동 */
const RankInten = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80px;
    user-select: none;
`;
/** rank 아이템 누적관객수 */
const RankViewer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 105px;
    user-select: none;
`;
/** rank 아이템 신규상영영화 */
const RankNew = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 75px;
    user-select: none;
`;

function DailyPage({dailyData}) {
    const [movieNumber,setMovieNumber] = useState(1);
    const [play,setPlay] = useState(true);
    const dotGen = useCallback(()=>{
        let contents = [];
        for(let i = 0; i<10; i++){
            contents.push(<PosterDot onClick={()=>{
                setMovieNumber(i+1);
            }} key={`PosterDot${i}`} bgColor={movieNumber===i+1?'000000':'aaaaaa'}/>)
        }
        return contents;
    },[movieNumber]);
    const RankItemGen = useCallback((e)=>{
        let contents = [];
        for(let i = 0;i<e.length;i++){
            contents.push(
                <RankItem key={`RankItem${i}`} bgColor={movieNumber===i+1?'F7F5EB':'ffffff'}>
                    <RankNumber key={`RankItemNumber${i}`}><Size20 key={`RankItemNumberText${i}`}>{e[i].rank}</Size20></RankNumber>
                    <RankTitle key={`RankItemTitle${i}`}><Size20 key={`RankItemTitleText${i}`}>{e[i].movieNm}</Size20></RankTitle>
                    <RankInten key={`RankItemInten${i}`}><Size20 key={`RankItemIntenText${i}`}>{e[i].rankInten}</Size20></RankInten>
                    <RankViewer key={`RankItemViewer${i}`}><Size20 key={`RankItemViewerText${i}`}>{e[i].audiAcc}</Size20></RankViewer>
                    <RankNew key={`RankItemNew${i}`}><Size20 key={`RankItemNewText${i}`}>{e[i].rankOldAndNew}</Size20></RankNew>
                </RankItem>
            )
        }
        return contents;
    },[movieNumber]);
    return (
        <>
        {dailyData===undefined?
        <Container>
            <LoadingData>
                <LoadingLogo src='./loading.png' alt=''></LoadingLogo>
                <LoadingText>Loading Data!</LoadingText>
                <LoadingText>Wait a moment q(≧▽≦q)</LoadingText>
            </LoadingData>
        </Container>:
        <Container>
            <Main1>
                <Size80Bold color='332FD0'
                style={{textShadow:'2px 4px 4px rgba(0,0,0,0.4)'}}
                >BOX OFFICE</Size80Bold>
                <PosterContainer>
                    <PosterImage src={dailyData[movieNumber-1].poster}></PosterImage>
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
            <Main2>
                <Size40Bold color='332FD0' style={{marginBottom:'10px'}}>2023.03.09</Size40Bold>
                <RankContents>
                    <RankItem>
                        <RankNumber style={{borderRight:"1px solid black",borderTop:"1px solid black"}}><Size20>순위</Size20></RankNumber>
                        <RankTitle style={{justifyContent:'center',borderRight:"1px solid black",borderTop:"1px solid black"}}><Size20>제목</Size20></RankTitle>
                        <RankInten style={{borderRight:"1px solid black",borderTop:"1px solid black"}}><Size20>변동</Size20></RankInten>
                        <RankViewer style={{borderRight:"1px solid black",borderTop:"1px solid black"}}><Size20>관객수</Size20></RankViewer>
                        <RankNew style={{borderTop:"1px solid black"}}><Size20>신규</Size20></RankNew>
                    </RankItem>
                    {
                        RankItemGen(dailyData)
                    }
                </RankContents>
            </Main2>
        </Container>
        }
        </>
    )
}

export default DailyPage
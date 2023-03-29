import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Size80Bold } from "../Components/TextFormat";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { BuildProxy } from "../buildConfig/proxyConfig";
import { Link } from "react-router-dom";
import { KobisSearch } from "../API/Artifact/KobisAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
/** 검색 item 컨테이너 */
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
`;
/** 검색 내용 입력 */
const SearchInput = styled.input`
  display: flex;
  font-size: 30px;
  background-color: white;
  width: 60%;
  border-radius: 20px 0px 0px 20px;
  padding: 5px 20px;
  box-sizing: border-box;
  border: 1px solid black;
`;
/** 검색 submit 버튼 */
const SearchButton = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  height: 46px;
  width: 10%;
  background-color: #8ea7e9;
  border-radius: 0px 20px 20px 0px;
  border: 1px solid black;
  font-size: 30px;
  color: white;
  :active {
    scale: 0.98;
  }
`;
/** 검색 데이터 송출 콘테이너 */
const SearchDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 70%;
  height: 75%;
  background-color: white;
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: gray;
    border-radius: 5px;
  }
`;
/** 검색 데이터 형식 */
const SearchInfoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  height: 60px;
  min-height: 60px;
  background-color: ${(props) => {
    return props.bgColor === undefined ? "white" : "#" + props.bgColor;
  }};
  position: sticky;
  top: 0;
`;
/** 검색 데이터 item */
const SearchDataItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  height: 60px;
  min-height: 60px;
  background-color: ${(props) => {
    return props.bgColor === undefined ? "white" : "#" + props.bgColor;
  }};
`;
/** 검색 데이터 제목 */
const SearchDataTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0px 10px 0px;
  align-items: center;
  color: ${(props) => {
    return props.color === undefined ? "black" : "#" + props.color;
  }};
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  white-space: nowrap;
  overflow: hidden;
  font-family: "CM";
`;
/** 검색 데이터 방영일 */
const SearchDataDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => {
    return props.color === undefined ? "black" : "#" + props.color;
  }};
  width: 15%;
  height: 100%;
  min-width: 125px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  font-family: "CM";
`;
/** 검색 데이터 장르 */
const SearchDataGenre = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => {
    return props.color === undefined ? "black" : "#" + props.color;
  }};
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-family: "CM";
`;
/** 검색 데이터의 내용이 없음 혹은 검색을 진행하지 않았을 경우 나오는 페이지 */
const NoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 50px;
  font-weight: bold;
  color: #ff6464;
  font-family: "CM";
`;
/** No data시에 나오는 로딩 이미지 */
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: LoadingRotate 2s linear infinite;
  @keyframes LoadingRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(365deg);
    }
  }
`;

function SearchPage() {
  const [searchContents, setSearchContents] = useState("");
  const [searchData, setSearchData] = useState();
  const SearchItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < searchData.length; i++) {
      contents.push(
        <SearchDataItem key={`searchDataItem${i}`}>
          <Link
            to={`/MovieInfo/movie-info?movieCd=${searchData[i].movieCd}&title=${searchData[i].movieNm}`}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <SearchDataTitle
              title={searchData[i].movieNm}
              key={`searchDataTitle${i}`}
            >
              {searchData[i].movieNm}
            </SearchDataTitle>
            <SearchDataDate key={`searchDataDate${i}`}>
              {searchData[i].openDt}
            </SearchDataDate>
            <SearchDataGenre key={`searchDataGenre${i}`}>
              {searchData[i].repGenreNm}
            </SearchDataGenre>
          </Link>
        </SearchDataItem>
      );
    }
    return contents;
  }, [searchData]);
  return (
    <Container>
      <Size80Bold
        color="332FD0"
        style={{ textShadow: "2px 4px 4px rgba(0,0,0,0.4)" }}
      >
        Movie Search
      </Size80Bold>
      <SearchBar>
        <BsSearch fontSize={"50px"} color="7286D3" />
        <SearchInput
          placeholder="Movie Title Typing Here"
          value={searchContents}
          onChange={(e) => {
            setSearchContents(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (searchContents.length !== 0) {
                e.target.value = "";
                KobisSearch(searchContents).then((value) => {
                  setSearchData(value.movieList);
                  setSearchContents("");
                });
              } else {
                alert("검색어를 입력하세요");
              }
            }
          }}
        ></SearchInput>
        <SearchButton
          onClick={() => {
            if (searchContents.length !== 0) {
              KobisSearch(searchContents).then((value) => {
                setSearchData(value.movieList);
                setSearchContents("");
              });
            } else {
              alert("검색어를 입력하세요");
            }
          }}
        >
          Submit
        </SearchButton>
      </SearchBar>
      <SearchDataContainer>
        <SearchInfoItem bgColor="E4D0D0">
          <SearchDataTitle color="FD8A8A">Title</SearchDataTitle>
          <SearchDataDate color="FD8A8A">Date</SearchDataDate>
          <SearchDataGenre color="FD8A8A">Genre</SearchDataGenre>
        </SearchInfoItem>
        {searchData === undefined ? (
          <NoData>
            <LoadingIcon>
              <AiOutlineLoading3Quarters />
            </LoadingIcon>
            Data Empty
          </NoData>
        ) : searchData.length === 0 ? (
          <NoData>
            <LoadingIcon>
              <AiOutlineLoading3Quarters />
            </LoadingIcon>
            No Match Data
          </NoData>
        ) : (
          <>{SearchItemGen()}</>
        )}
      </SearchDataContainer>
    </Container>
  );
}

export default SearchPage;

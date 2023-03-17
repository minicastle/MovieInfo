import React, { useCallback } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 475px;
  /* overflow: hidden; */
  position: absolute;
  left: ${(props) => {
    return props.position * -1 + "px";
  }};
  gap: 8px;
`;
/** 포스터 이미지 */
const PosterImage = styled.img`
  width: 475px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

function Carousel({ dailyData, movieNumber }) {
  const PosterGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < dailyData.length; i++) {
      contents.push(
        <PosterImage src={dailyData[i].poster} alt="" key={"poster" + i} />
      );
    }
    return contents;
  }, []);
  return (
    <Container position={(movieNumber - 1) * 483}>{PosterGen()}</Container>
  );
}

export default Carousel;

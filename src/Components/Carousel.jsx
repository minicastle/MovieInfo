import React, { useCallback } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: ${(props) => {
    return props.position * -1 + "px";
  }};
`;
/** 포스터 이미지 콘테이너 */
const PosterImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 467px;
  height: fit-content;
`;
/** 포스터 이미지 */
const PosterImage = styled.img`
  width: 440px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  background-color: transparent;
`;

function Carousel({ dailyData, movieNumber }) {
  const PosterGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < dailyData.length; i++) {
      contents.push(
        <PosterImages key={"poster Container " + i}>
          <PosterImage src={dailyData[i].poster} alt="" key={"poster" + i} />
        </PosterImages>
      );
    }
    return contents;
  }, []);
  return (
    <Container position={(movieNumber - 1) * 467}>{PosterGen()}</Container>
  );
}

export default Carousel;

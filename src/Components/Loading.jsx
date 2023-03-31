import React from "react";
import styled from "@emotion/styled";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/** 데이터를 불러오고 있을시 나오는 페이지 */
const NoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 40px;
  font-weight: bold;
  color: #ff6464;
  font-family: "CM";
  text-align: center;
`;
/** 데이터를 불러오고 있을시 나오는 페이지 로딩 이미지 */
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
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

function Loading() {
  return (
    <NoData>
      <LoadingIcon>
        <AiOutlineLoading3Quarters />
      </LoadingIcon>
      Loading Now! Please Wait~~ q(≧▽≦q)
    </NoData>
  );
}

export default Loading;

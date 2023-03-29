import React from "react";
import styled from "@emotion/styled";
import { BsTools } from "react-icons/bs";
import { Size40Bold } from "./TextFormat";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  gap: 50px;
  position: relative;
  padding-top: 33px;
`;
/** 데이터를 불러오고 있을시 나오는 페이지 로딩 이미지 */
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 160px;
  animation: LoadingRotate 2s linear infinite;
  @keyframes LoadingRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(365deg);
    }
  }
  position: absolute;
  top: 0;
  color: #576cbc;
`;

function DevelopNotYet() {
  return (
    <Container>
      <LoadingIcon>
        <AiOutlineLoading3Quarters />
      </LoadingIcon>
      <BsTools color="19376D" style={{ zIndex: 1 }} />
      <Size40Bold color="fe6244">제작이 진행중인 페이지 입니다...</Size40Bold>
    </Container>
  );
}

export default DevelopNotYet;

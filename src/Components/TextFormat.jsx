import styled from "@emotion/styled";

export const TitleFont = styled.div`
  user-select: none;
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  font-family: "CM";
  @media screen and (max-width: 950px) {
    padding-top: 110px;
  }
  @media screen and (max-width: 550px) {
    padding-top: 80px;
  }
`;
export const Size80Bold = styled.div`
  user-select: none;
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  font-family: "CM";
  @media screen and (max-width: 620px) {
    font-size: 50px;
  }
`;

export const Size40Bold = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  @media screen and (max-width: 950px) {
    font-size: 30px;
    word-break: keep-all;
  }
`;
export const Size40BoldWrap = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  word-break: keep-all;
  font-size: 40px;
  font-weight: bold;
`;

export const Size30Bold = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Size20 = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Size20Wrap = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  word-break: keep-all;
  font-size: 20px;
  @media screen and (max-width: 550px) {
    font-size: 15px;
  }
`;

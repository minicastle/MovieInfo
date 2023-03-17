import styled from "@emotion/styled";

export const Size80Bold = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
  font-size: 80px;
  font-weight: bold;
`;

export const Size40Bold = styled.div`
  color: ${(props) => {
    return props.color !== undefined ? "#" + props.color : "black";
  }};
  text-align: center;
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

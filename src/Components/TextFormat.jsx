import styled from '@emotion/styled';

export const Size80Bold = styled.div`
    color: ${(props)=>{return props.color!==undefined?"#"+props.color:'black'}};
    text-align: center;
    font-size: 80px;
    font-weight: bold;
`;
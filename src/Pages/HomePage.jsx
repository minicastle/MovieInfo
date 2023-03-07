import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #B9F3E4;
`;

function HomePage() {
    return (
        <Container>Homepage</Container>
    )
}

export default HomePage
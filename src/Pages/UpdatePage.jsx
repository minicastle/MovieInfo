import React from "react";
import styled from "@emotion/styled";
import DevelopNotYet from "../Components/DevelopNotYet";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function UpdatePage() {
  return (
    <Container>
      <DevelopNotYet></DevelopNotYet>
    </Container>
  );
}

export default UpdatePage;

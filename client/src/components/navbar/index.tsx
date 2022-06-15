import React from "react";
import styled from "styled-components";
import { device } from "../../constants";

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 20px lightblue;
  margin-bottom: 30px;

  @media ${device.lg} {
    height: 60px;
  }
`;

const Logo = styled.img`
  height: 90%;
  margin-left: 20px;

  @media ${device.lg} {
    height: 50%;
    margin-left: 20px;
  }
`;

type Props = {};

function Navbar({}: Props) {
  return (
    <Container>
      <Logo src="logo-skillPlane.png" />
    </Container>
  );
}

export default Navbar;

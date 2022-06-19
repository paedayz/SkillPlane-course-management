import styled from "styled-components";
import { device } from "../../constants";
import FilterBar from "./filter.bar";
import LogoutButton from "./logout.btn";

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 20px lightblue;
  margin-bottom: 30px;
  user-select: none;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
`;

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
  justify-content: right;
  @media ${device.ipad} {
    font-size: 10px;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 90%;
  margin-left: 20px;

  @media ${device.ipad} {
    height: 50%;
    margin-left: 20px;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

type Props = {
  defalutKeyword: string | null;
  defaultMinDuration: string | null;
  defaultMaxDuration: string | null;
};

function Navbar({
  defalutKeyword,
  defaultMinDuration,
  defaultMaxDuration,
}: Props) {
  return (
    <Container>
      <Logo src="logo-skillPlane.png" />
      <RightContainer>
        <FilterBar
          defalutKeyword={defalutKeyword}
          defaultMinDuration={defaultMinDuration}
          defaultMaxDuration={defaultMaxDuration}
        />
        <LogoutButton />
      </RightContainer>
    </Container>
  );
}

export default Navbar;

import { Button, Input, Slider } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { device } from "../../constants";

const { Search } = Input;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 20px lightblue;
  margin-bottom: 30px;
  user-select: none;
  font-family: "Kanit", sans-serif;

  @media ${device.lg} {
    height: 60px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
  align-items: right;
  justify-content: right;
`;

const Logo = styled.img`
  height: 90%;
  margin-left: 20px;

  @media ${device.lg} {
    height: 50%;
    margin-left: 20px;
  }
`;

const SearchBox = styled(Search)`
  margin-right: 10px;
`;

const SliderContainer = styled.div`
  width: 300px;
  margin-right: 10px;
`;

type Props = {};

function Navbar({}: Props) {
  const history = useHistory();

  const skip = useAppSelector(state => state.course.skip)

  const onclickLogout = async () => {
    const res = await logout();
    if (res) history.push("/login");
  };

  const onSearch = (value: string) => console.log(value);

  const onChange = (value: number | [number, number]) => {
    console.log("onChange: ", value);
  };

  const onAfterChange = (value: number | [number, number]) => {
    console.log("onAfterChange: ", value);
  };

  return (
    <Container>
      <Logo src="logo-skillPlane.png" />
      <RightContainer>
        <div>
          {skip}
        </div>
        <SliderContainer>
          <div>Max-Min Hour</div>
          <Slider onAfterChange={onAfterChange} range step={1} min={0} max={20}/>
        </SliderContainer>

        <SearchBox
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button danger onClick={onclickLogout}>
          logout
        </Button>
      </RightContainer>
    </Container>
  );
}

export default Navbar;

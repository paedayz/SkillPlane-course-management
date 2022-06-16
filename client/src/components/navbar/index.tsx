import { Button, Input, Slider } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
import { getCourse } from "../../api/course.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import { resetSkip } from "../../slices/course.slice";

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
  // useState
  const [keyword, setKeyword] = useState<string>();
  const [minDuration, setMinDuration] = useState<number>();
  const [maxDuration, setMaxDuration] = useState<number>();
  
  const history = useHistory();

  const take = useAppSelector(state => state.course.take)
  const skip = useAppSelector(state => state.course.skip);

  const dispatch = useAppDispatch()

  const onclickLogout = async () => {
    const res = await logout();
    if (res) history.push("/login");
  };

  const getData = async () => {
    const resCourse = await getCourse(
      take,
      skip,
      keyword,
      minDuration,
      maxDuration
    )

    
  }

  const onSearch = async (value: string) => {
    dispatch(resetSkip())
    await getData()
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  const onAfterChange = (value: number | [number, number]) => {
    console.log("onAfterChange: ", value);
  };

  return (
    <Container>
      <Logo src="logo-skillPlane.png" />
      <RightContainer>
        <SliderContainer>
          <div>Max-Min Hour</div>
          <Slider onAfterChange={onAfterChange} range step={1} min={0} max={20}/>
        </SliderContainer>

        <SearchBox
          placeholder="input search text"
          onChange={onChangeSearch}
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

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Slider, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
import { getCourse } from "../../api/course.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import {
  addCourse,
  resetBeforeQueryGet,
  resetCourseSlice,
  setInitialLoading,
  setQueryParams,
} from "../../slices/course.slice";
import { resetUserSlice } from "../../slices/user.slice";

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

const SearchBox = styled(Search)`
  width: 250px;
  margin-right: 10px;
  @media ${device.ipad} {
    width: 200px;
  }

  @media ${device.mobile} {
    width: 140px;
  }
`;

const SliderContainer = styled.div`
  width: 300px;
  margin-right: 10px;
  @media ${device.ipad} {
    width: 150px;
  }

  @media ${device.mobile} {
    width: 100px;
  }
`;

const FilterContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 20px;
`;

const LogoutButton = styled(Button)`
  @media ${device.ipad} {
    font-size: 10px;
    width: 60px;
    height: 25px;
    text-align: center;
  }
`;

const secondToHour = (value: number): number => {
  return (value / 3600) >> 0;
};

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
  const history = useHistory();

  const take = useAppSelector((state) => state.course.take);
  const skip = useAppSelector((state) => state.course.skip);
  const keyword = useAppSelector((state) => state.course.keyword);
  const maxDuration = useAppSelector((state) => state.course.maxDuration);
  const minDuration = useAppSelector((state) => state.course.minDuration);

  const takeRef = useRef(take);
  const skipRef = useRef(skip);
  const keywordRef = useRef(keyword);
  const maxDurationRef = useRef(maxDuration);
  const minDurationRef = useRef(minDuration);

  // useState
  const [keywordState, setKeywordState] = useState(
    defalutKeyword ? defalutKeyword : ""
  );

  const [maxDurationState, setMaxDurationState] = useState(
    defaultMinDuration ? secondToHour(parseInt(defaultMinDuration)) : 0
  );
  const [minDurationState, setMinDurtaionState] = useState(
    defaultMaxDuration ? secondToHour(parseInt(defaultMaxDuration)) : 0
  );

  const dispatch = useAppDispatch();

  const onclickLogout = async () => {
    const res = await logout();
    if (res) {
      history.push("/login");
      dispatch(resetUserSlice())
      dispatch(resetCourseSlice())
    }
  };

  const getData = async () => {
    const resCourse = await getCourse(
      takeRef.current,
      skipRef.current,
      keywordRef.current,
      minDurationRef.current,
      maxDurationRef.current
    );
    if (resCourse && resCourse.length !== 0) {
      dispatch(addCourse(resCourse));
    }
  };

  const onSearch = async (isEmptyKeyword: boolean = false) => {
    dispatch(
      setQueryParams({
        keyword: isEmptyKeyword ? undefined : keywordState,
        minDuration: minDurationRef.current,
        maxDuration: maxDurationRef.current,
      })
    );
    keywordRef.current = isEmptyKeyword ? undefined : keywordState;

    dispatch(setInitialLoading(true));
    dispatch(resetBeforeQueryGet());
    await getData();
    dispatch(setInitialLoading(false));
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordState(e.target.value);
    if (e.target.value.length === 0) onSearch(true);
  };

  const onSliderChange = (value: [number, number]) => {
    setMinDurtaionState(value[0]);
    setMaxDurationState(value[1]);
  };

  const onAfterSliderChange = (value: [number, number]) => {
    const minSecond = value[0] * 3600;
    const maxSecond = value[1] * 3600;
    dispatch(
      setQueryParams({
        keyword: keyword,
        minDuration: minSecond,
        maxDuration: maxSecond,
      })
    );
    skipRef.current = 0;
    minDurationRef.current = minSecond;
    maxDurationRef.current = maxSecond;
    onSearch();
  };

  const onClickClearFilter = async () => {
    keywordRef.current = undefined;
    minDurationRef.current = undefined;
    maxDurationRef.current = undefined;

    setMinDurtaionState(0);
    setMaxDurationState(0);
    setKeywordState("");

    dispatch(setQueryParams({}));

    dispatch(setInitialLoading(true));
    dispatch(resetBeforeQueryGet());
    await getData();
    dispatch(setInitialLoading(false));
  };

  return (
    <Container>
      <Logo src="logo-skillPlane.png" />
      <RightContainer>
        <FilterContainer>
          <SliderContainer>
            <div>Max-Min Hour</div>
            <Slider
              value={[minDurationState, maxDurationState]}
              onChange={onSliderChange}
              onAfterChange={onAfterSliderChange}
              range
              step={1}
              min={0}
              max={20}
            />
          </SliderContainer>

          <SearchBox
            value={keywordState}
            placeholder="input search text"
            onChange={onChangeSearch}
            onSearch={() => onSearch()}
          />

          <Tooltip title="Clear filter">
            <Button
              onClick={onClickClearFilter}
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </FilterContainer>

        <LogoutButton danger onClick={onclickLogout}>
          logout
        </LogoutButton>
      </RightContainer>
    </Container>
  );
}

export default Navbar;

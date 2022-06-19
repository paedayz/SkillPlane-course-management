import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Slider, Tooltip } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";
import { getCourse } from "../../api/course.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import {
  addCourse,
  setQueryParams,
  setInitialLoading,
  resetBeforeQueryGet,
} from "../../slices/course.slice";

const { Search } = Input;

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

const secondToHour = (value: number): number => {
  return (value / 3600) >> 0;
};

type Props = {
  defalutKeyword: string | null;
  defaultMinDuration: string | null;
  defaultMaxDuration: string | null;
};

function FilterBar({
  defalutKeyword,
  defaultMinDuration,
  defaultMaxDuration,
}: Props) {
  // Redux
  const take = useAppSelector((state) => state.course.take);
  const skip = useAppSelector((state) => state.course.skip);
  const keyword = useAppSelector((state) => state.course.keyword);
  const maxDuration = useAppSelector((state) => state.course.maxDuration);
  const minDuration = useAppSelector((state) => state.course.minDuration);

  const dispatch = useAppDispatch();

  //   useRef
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

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordState(e.target.value);
    if (e.target.value.length === 0) onSearch(true);
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
  );
}

export default FilterBar;

import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CourseCard from "../../components/course/course.card";
import EmptyComponent from "../../components/empty";
import Navbar from "../../components/navbar";
import { device } from "../../constants";
import {
  addCourse,
  setInitialLoading,
  setPaginationLoading,
  setQueryParams,
} from "../../slices/course.slice";

// styled
const Container = styled.div`
  width: 100%;
  padding: 50px 20px 20px 20px;
`;

const CourseCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
  @media ${device.lg} {
    display: block;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`;

type Props = {};

function Homepage({}: Props) {
  // useState
  const initialLoading = useAppSelector((state) => state.course.initialLoading);
  const paginationLoading = useAppSelector(
    (state) => state.course.paginationLoading
  );
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

  const [scrolling, setScrolling] = useState<number>(0);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  // Redux
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course.courses);

  // Functions and constant
  const initialCourseData = async () => {
    const resCourse = await getCourse(
      take,
      skipRef.current,
      keywordRef.current,
      minDurationRef.current,
      maxDurationRef.current
    );

    if (resCourse && resCourse.length !== 0) {
      dispatch(addCourse(resCourse));
    }

    dispatch(setInitialLoading(false));
  };

  const paginationGetData = () => {
    dispatch(setPaginationLoading(true));

    document.body.style.overflow = "hidden";

    setTimeout(async () => {
      const resCourse = await getCourse(
        take,
        skipRef.current,
        keywordRef.current,
        minDurationRef.current,
        maxDurationRef.current
      );

      if (resCourse && resCourse.length !== 0) {
        dispatch(addCourse(resCourse));
      }

      dispatch(setPaginationLoading(false));

      document.body.style.overflow = "visible";
    }, 2000);
  };

  const renderCourseCard =
    courses.length > 0 ? (
      courses.map((course) => {
        return <CourseCard key={Math.random()} data={course} />;
      })
    ) : (
      <EmptyComponent description="No data" />
    );

  const handleNavigation = (e: Event) => {
    setScrolling(window.scrollY);
    if (
      document.body.offsetHeight + window.scrollY ===
        document.body.scrollHeight &&
      !paginationLoading
    ) {
      paginationGetData();
    }
  };

  const getSearchParams = () => {
    let takeParams = params.get("take");
    let skipParams = params.get("skip");
    let keywordParams = params.get("keyword");
    let minDurationParams = params.get("minDuration");
    let maxDurationParams = params.get("maxDuration");

    takeRef.current = takeParams ? parseInt(takeParams) : takeRef.current;
    skipRef.current = skipParams ? parseInt(skipParams) : skipRef.current;
    keywordRef.current = keywordParams ? keywordParams : keywordRef.current;
    minDurationRef.current = minDurationParams
      ? parseInt(minDurationParams)
      : minDurationRef.current;
    maxDurationRef.current = maxDurationParams
      ? parseInt(maxDurationParams)
      : maxDurationRef.current;

    dispatch(
      setQueryParams({
        keyword: keywordRef.current,
        minDuration: minDurationRef.current,
        maxDuration: maxDurationRef.current,
      })
    );

    console.log("params >> ", {
      keywordParams,
      minDurationParams,
      maxDurationParams,
    });
  };

  // useEffect
  useEffect(() => {
    getSearchParams();
    initialCourseData();
  }, []);

  useEffect(() => {
    skipRef.current = skip;
    keywordRef.current = keyword;
    minDurationRef.current = minDuration;
    maxDurationRef.current = maxDuration;

    window.addEventListener("scroll", (e) => handleNavigation(e));

    return () => {
      return window.removeEventListener("scroll", (e) => handleNavigation(e));
    };
  }, [scrolling]);

  return (
    <Container>
      <Navbar defalutKeyword={params.get("keyword")} defaultMinDuration={params.get("minDuration")} defaultMaxDuration={params.get("maxDuration")}/>

      <CourseCardContainer>
        {!initialLoading ? (
          renderCourseCard
        ) : (
          <SpinnerContainer>
            <Spin size="large" />
          </SpinnerContainer>
        )}
      </CourseCardContainer>

      {paginationLoading && (
        <SpinnerContainer>
          <Spin size="large" />
        </SpinnerContainer>
      )}

      <div style={{ marginBottom: "300px" }} />
    </Container>
  );
}

export default Homepage;

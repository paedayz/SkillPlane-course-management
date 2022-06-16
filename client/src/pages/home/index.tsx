import { Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CourseCard from "../../components/course/course.card";
import EmptyComponent from "../../components/empty";
import Navbar from "../../components/navbar";
import { addCourse, selectSkip } from "../../slices/course.slice";

// styled
const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const CourseCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type Props = {};

function Homepage({}: Props) {
  // useState
  const [take, setTake] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>();
  const [minDuration, setMinDuration] = useState<number>();
  const [maxDuration, setMaxDuration] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const skip = useAppSelector(selectSkip);
  const skipRef = useRef(skip);

  const [scrolling, setScrolling] = useState<number>(0);

  const setSkipRef = (data: number) => {
    skipRef.current = data;
  };

  // Redux
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course.courses);

  // Functions and constant
  const getData = async () => {
    const resCourse = await getCourse(
      take,
      skipRef.current,
      keyword,
      minDuration,
      maxDuration
    );

    if (resCourse && resCourse.length !== 0) {
      dispatch(addCourse(resCourse));
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const paginationGetData = () => {
    setPaginationLoading(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      getData();
      setPaginationLoading(false);
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

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSkipRef(skip);

    window.addEventListener("scroll", (e) => handleNavigation(e));

    return () => {
      return window.removeEventListener("scroll", (e) => handleNavigation(e));
    };
  }, [scrolling]);

  return (
    <Container>
      <Navbar />
      <CourseCardContainer>
        {!loading ? renderCourseCard : <Spin size="large" />}
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

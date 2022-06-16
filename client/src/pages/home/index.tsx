import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CourseCard from "../../components/course/course.card";
import EmptyComponent from "../../components/empty";
import Navbar from "../../components/navbar";
import { addCourse } from "../../slices/course.slice";

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

  let skip = 0;

  // Redux
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course.courses);

  // Functions and constant
  const getData = async () => {
    const resCourse = await getCourse(
      take,
      skip,
      keyword,
      minDuration,
      maxDuration
    );

    if (resCourse) {
      if(resCourse.length !== 0) skip = skip + 10;
      dispatch(addCourse(resCourse));
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const paginationGetData = () => {
    setPaginationLoading(true);
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      getData();
      setPaginationLoading(false);
      document.body.style.overflow = 'visible'
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

    window.addEventListener("scroll", (e) => handleNavigation(e));

    return () => {
      window.removeEventListener("scroll", (e) => handleNavigation(e));
    };
  }, []);

  return (
    <Container>
      <Navbar />
      <CourseCardContainer>
        {!loading ? renderCourseCard : <Spin size="large" />}
      </CourseCardContainer>
      {paginationLoading && <SpinnerContainer><Spin size="large" /></SpinnerContainer>}
      <div style={{ marginBottom: "300px" }} />
    </Container>
  );
}

export default Homepage;

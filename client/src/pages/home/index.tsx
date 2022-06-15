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

type Props = {};

function Homepage({}: Props) {
  // useState
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [keyword, setKeyword] = useState<string>();
  const [minDuration, setMinDuration] = useState<number>();
  const [maxDuration, setMaxDuration] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);

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
      dispatch(addCourse(resCourse));
      setLoading(false);
      setSkip(skip + 10);
    } else {
      setLoading(false);
    }
  };

  const renderCourseCard =
    courses.length > 0 ? (
      courses.map((course) => {
        return <CourseCard data={course} />;
      })
    ) : (
      <EmptyComponent description="No data" />
    );

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Navbar />
      <CourseCardContainer>
        {!loading ? renderCourseCard : <Spin size="large" />}
      </CourseCardContainer>
      <div style={{ marginBottom: "100px" }} />
    </Container>
  );
}

export default Homepage;

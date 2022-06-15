import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CourseCard from "../../components/course/course.card";
import EmptyComponent from "../../components/empty";
import Navbar from "../../components/navbar";
import { addCourse } from "../../slices/course.slice";

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
        return <div>{course.name}</div>;
      })
    ) : (
      <EmptyComponent description="No data" />
    );

  // useEffect
  useEffect(() => {
    // getData();
  }, []);

  const MOCK_COURSE = {
    id: 16,
    name: "Flutter crash course",
    description: "Build your mobile application easier with flutter",
    category: "coding",
    image:
      "https://firebasestorage.googleapis.com/v0/b/fir-react-example-e2b28.appspot.com/o/1f51f2c9-fac8-4a65-a3fc-187dbdc2c29b.jpg?alt=media",
    subject: "computer",
    startTime: new Date("2022-06-19T17:00:00.000Z"),
    endTime: new Date("2022-07-04T17:00:00.000Z"),
    numberOfStudent: 20,
    duration: 3600,
    createdBy: "pae",
    createdAt: new Date("2022-06-15T01:43:28.118Z"),
  };

  return (
    <div>
      <Navbar />
      <div>home</div>
      <div>{!loading ? renderCourseCard : <Spin size="large" />}</div>
      <CourseCard data={MOCK_COURSE} />
    </div>
  );
}

export default Homepage;

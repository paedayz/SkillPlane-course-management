import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
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

  const renderCourseCard = courses.map((course) => {
    return <div>{course.name}</div>;
  });

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>home</div>
      <div>{!loading? renderCourseCard : <Spin size='large'/>}</div>
    </div>
  );
}

export default Homepage;

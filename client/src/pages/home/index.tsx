import { Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCourse } from "../../api/course.api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import AddCrouseButton from "../../components/course/create.course.button";
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
  padding: 50px 20px 350px 20px;
  background-color: #ceefff;
`;

const CourseCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
  @media ${device.ipad} {
    display: block;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type Props = {};

function Homepage(_: Props) {
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

  const [scrolling, setScrolling] = useState<number>(0);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  // Redux
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const courses = useAppSelector((state) => state.course.courses);

  // Functions and constant
  const paginationGetData = () => {
    dispatch(setPaginationLoading(true));

    document.body.style.overflow = "hidden";

    setTimeout(async () => {
      const resCourse = await getCourse(
        take,
        skip,
        keyword,
        minDuration,
        maxDuration
      );

      if (resCourse && resCourse.length !== 0) {
        dispatch(addCourse(resCourse));
      }

      dispatch(setPaginationLoading(false));

      document.body.style.overflow = "visible";
    }, 1000);
  };

  const handleNavigation = (e: Event) => {
    setScrolling(window.scrollY);
    if (
      document.body.offsetHeight + window.scrollY >=
        document.body.scrollHeight &&
      !paginationLoading
    ) {
      paginationGetData();
    }
  };

  const initialCourseData = async (
    takeQuery: number,
    skipQuery: number,
    keywordQuery: string | undefined,
    minDurationQuery: number | undefined,
    maxDurationQuery: number | undefined
  ) => {
    dispatch(setInitialLoading(true));
    const resCourse = await getCourse(
      takeQuery,
      skipQuery,
      keywordQuery,
      minDurationQuery,
      maxDurationQuery
    );

    if (resCourse && resCourse.length !== 0) {
      dispatch(addCourse(resCourse));
    }

    dispatch(setInitialLoading(false));
  };

  const getSearchParams = () => {
    let takeParams = params.get("take");
    let skipParams = params.get("skip");
    let keywordParams = params.get("keyword");
    let minDurationParams = params.get("minDuration");
    let maxDurationParams = params.get("maxDuration");

    const takeQuery = takeParams ? parseInt(takeParams) : take;
    const skipQuery = skipParams ? parseInt(skipParams) : skip;
    const keywordQuery = keywordParams ? keywordParams : keyword;
    const minDurationQuery = minDurationParams
      ? parseInt(minDurationParams)
      : minDuration;
    const maxDurationQuery = maxDurationParams
      ? parseInt(maxDurationParams)
      : maxDuration;

    dispatch(
      setQueryParams({
        take: takeQuery,
        skip: skipQuery,
        keyword: keywordQuery,
        minDuration: minDurationQuery,
        maxDuration: maxDurationQuery,
      })
    );

    initialCourseData(
      takeQuery,
      skipQuery,
      keywordQuery,
      minDurationQuery,
      maxDurationQuery
    );
  };

  const renderCourseCard =
    courses.length > 0 ? (
      courses.map((course) => {
        return <CourseCard key={Math.random()} courseData={course} />;
      })
    ) : (
      <EmptyComponent description="No data" />
    );

  const renderLoadingElement = (
    <SpinnerContainer>
      <Spin size="large" />
    </SpinnerContainer>
  );

  // useEffect
  useEffect(() => {
    getSearchParams();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    return () => {
      return window.removeEventListener("scroll", handleNavigation);
    };
    // eslint-disable-next-line
  }, [scrolling]);

  return (
    <Container>
      <Navbar
        defalutKeyword={params.get("keyword")}
        defaultMinDuration={params.get("minDuration")}
        defaultMaxDuration={params.get("maxDuration")}
      />

      <CourseCardContainer>
        {!initialLoading ? renderCourseCard : renderLoadingElement}
      </CourseCardContainer>

      {paginationLoading && renderLoadingElement}

      {userRole === "admin" && <AddCrouseButton />}
    </Container>
  );
}

export default Homepage;

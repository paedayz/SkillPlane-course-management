import styled from "styled-components";
import { device } from "../../constants";
import { ICourse } from "../../slices/course.slice";
import CourseCardBack from "./course.card.back";
import CourseCardFront from "./course.card.front";

const Container = styled.div`
  width: 250px;
  height: 350px;
  margin-bottom: 20px;
  margin-right: 20px;
  background-color: transparent;
  cursor: pointer;
  user-select: none;

  @media ${device.ipad} {
    width: 100%;
    height: 200px;
    display: flex;
  }

  &:hover .course-card-inner {
    transform: rotateY(180deg);
  }

  .course-card-front,
  .course-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    @media ${device.ipad} {
      width: 100%;
      display: flex;
    }
  }

  .course-card-front {
    color: black;
  }

  .course-card-back {
    transform: rotateY(180deg);
  }
`;

const CourseCardInner = styled.div`
  box-shadow: 0px 10px 10px 0px #d0d0d0;
  background-color: white;
  border-radius: 10px;
  padding: 10px 10px 0px 0px;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.5s;
  transform-style: preserve-3d;

  @media ${device.ipad} {
    width: 100%;
    display: flex;
  }
`;

type Props = {
  courseData: ICourse;
};

function CourseCard({ courseData }: Props) {

  return (
    <Container>
      <CourseCardInner className="course-card-inner">
        <CourseCardFront courseData={courseData} />
        <CourseCardBack courseData={courseData} />
      </CourseCardInner>
    </Container>
  );
}

export default CourseCard;

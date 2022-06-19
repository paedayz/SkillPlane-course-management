import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import { ICourse } from "../../slices/course.slice";
import CourseDeleteButton from "./course.delete.button";

const BackImage = styled.img`
  width: 230px;
  object-fit: cover;
  transform: scaleX(-1);
  opacity: 50%;
  @media ${device.ipad} {
    height: 90%;
    width: 300px;
    margin-left: 10px;
    border-radius: 10px;
  }

  @media ${device.mobile} {
    height: 90%;
    width: 160px;
  }
`;

const CourseDuration = styled.div`
  margin-top: 10px;
`;

const CourseDetailContainer = styled.div`
  @media ${device.ipad} {
    text-align: left;
    margin-left: 20px;
    width: 100%;
    padding-right: 10px;
  }
`;

type Props = {
  courseData: ICourse;
};

function CourseCardBack({ courseData }: Props) {
  const { id, category, image, subject, numberOfStudent, duration } =
    courseData;

  // Redux
  const userRole = useAppSelector((state) => state.user.role);

  //   Function and constants
  const durationToString = (seconds: number): string => {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  return (
    <div className="course-card-back">
      {userRole === "admin" && <CourseDeleteButton courseId={id} />}

      <BackImage src={image} />
      <CourseDetailContainer>
        <CourseDuration>
          <b>Duration:</b> {durationToString(duration)}
        </CourseDuration>
        <CourseDuration>
          <b>Subject:</b> {subject}
        </CourseDuration>
        <CourseDuration>
          <b>Category:</b> {category}
        </CourseDuration>
        <CourseDuration>
          <b>Number of seat:</b> {numberOfStudent}
        </CourseDuration>
      </CourseDetailContainer>
    </div>
  );
}

export default CourseCardBack;

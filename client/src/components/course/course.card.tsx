import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import { ICourse } from "../../slices/course.slice";
import CourseDeleteButton from "./course.delete.button";

const Container = styled.div`
  width: 250px;
  height: 350px;
  margin-bottom: 20px;
  margin-right: 20px;
  background-color: transparent;
  cursor: pointer;
  user-select: none;

  @media ${device.lg} {
    width: 100%;
    height: 200px;
    display: flex;
  }

  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    @media ${device.lg} {
      width: 100%;
      display: flex;
    }
  }

  .flip-card-front {
    color: black;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
`;

const FlipCardInner = styled.div`
  box-shadow: 0px 10px 10px 0px #d0d0d0;
  background-color: #ceefff;
  border-radius: 10px;
  padding: 10px 10px 0px 0px;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.5s;
  transform-style: preserve-3d;

  @media ${device.lg} {
    width: 100%;
    display: flex;
  }
`;

const CourseImage = styled.img`
  width: 230px;
  object-fit: cover;
  @media ${device.lg} {
    height: 90%;
    width: 300px;
    margin-left: 10px;
    border-radius: 10px;
  }
`;

const CourseFlipImage = styled.img`
  width: 230px;
  object-fit: cover;
  transform: scaleX(-1);
  opacity: 50%;
  @media ${device.lg} {
    height: 90%;
    width: 300px;
    margin-left: 10px;
    border-radius: 10px;
  }
`;

const CourseName = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const CourseDescription = styled.div`
  margin-top: 10px;
  height: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media ${device.lg} {
    width: 65%;
  }
`;

const CourseRegisTimes = styled.div`
  font-size: 10px;
  margin-top: 25px;
  @media ${device.lg} {
    text-align: right;
    font-size: 13px;
    margin-top: 0;
  }
`;

const CourseDuration = styled.div`
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  @media ${device.lg} {
    text-align: left;
    margin-left: 20px;
    width: 100%;
    padding-right: 10px;
  }
`;
const FlipDetailContainer = styled.div`
  @media ${device.lg} {
    text-align: left;
    margin-left: 20px;
    width: 100%;
    padding-right: 10px;
  }
`;

type Props = {
  data: ICourse;
};

function CourseCard({ data }: Props) {
  const {
    id,
    name,
    description,
    category,
    image,
    subject,
    startTime,
    endTime,
    numberOfStudent,
    duration,
  } = data;

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
    <Container>
      <FlipCardInner className="flip-card-inner">
        <div className="flip-card-front">
          <CourseImage src={image} />
          <DetailContainer>
            <CourseName>{name}</CourseName>
            <CourseDescription>{description}</CourseDescription>
            <CourseRegisTimes>
              <div>Can register</div>
              <div>since {new Date(startTime).toDateString()}</div>
              <div>until {new Date(endTime).toDateString()}</div>
            </CourseRegisTimes>
          </DetailContainer>
        </div>

        <div className="flip-card-back">
          {userRole === 'admin' && <CourseDeleteButton courseId={id} />}

          <CourseFlipImage src={image} />
          <FlipDetailContainer>
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
          </FlipDetailContainer>
        </div>
      </FlipCardInner>
    </Container>
  );
}

export default CourseCard;

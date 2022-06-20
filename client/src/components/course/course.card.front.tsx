import styled from "styled-components";
import { device } from "../../constants";
import { ICourse } from "../../slices/course.slice";

const CourseImage = styled.img`
  width: 230px;
  object-fit: cover;
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

const CourseName = styled.div`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  @media ${device.mobile} {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 28px;
  }
`;

const CourseDescription = styled.div`
  margin-top: 10px;
  height: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media ${device.ipad} {
    width: 65%;
  }

  @media ${device.mobile} {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 45px;
    width: 100%;
  }
`;

const CourseRegisTimes = styled.div`
  font-size: 10px;
  margin-top: 25px;
  @media ${device.ipad} {
    text-align: right;
    font-size: 13px;
    margin-top: 0;
  }

  @media ${device.mobile} {
    text-align: right;
    font-size: 13px;
    margin-top: 20px;
  }
`;

const DetailContainer = styled.div`
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

function CourseCardFront({ courseData }: Props) {
  const { name, description, image, startTime, endTime } = courseData;
  return (
    <div className="course-card-front">
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
  );
}

export default CourseCardFront;

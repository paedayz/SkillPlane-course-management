import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip, Button, Modal } from "antd";
import styled from "styled-components";
import { deleteCourse } from "../../api/course.api";
import { useAppDispatch } from "../../app/hooks";
import { openNotificationWithIcon } from "../../common/notification";
import { deletedCourse } from "../../slices/course.slice";

const { confirm } = Modal;


const DeleteIconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100;
`;

type Props = {
  courseId: number;
};

function CourseDeleteButton({ courseId }: Props) {
  const dispatch = useAppDispatch();

  const deleteCourseHandler = async () => {
    const res = await deleteCourse(courseId);
    if (res) {
      dispatch(deletedCourse(courseId));
      openNotificationWithIcon("success", "", "Deleted successfully");
    }
  }

  const showPromiseConfirm = () => {
    confirm({
      title: 'Do you want to delete this course?',
      icon: <ExclamationCircleOutlined />,
      content: 'Please click OK to deleted this course',
      onOk() {
        return deleteCourseHandler()
      },
      onCancel() {},
    });
  };
  
  return (
    <DeleteIconContainer>
      <Tooltip title="Delete course" color={"red"}>
        <Button
          danger
          onClick={showPromiseConfirm}
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </DeleteIconContainer>
  );
}

export default CourseDeleteButton;

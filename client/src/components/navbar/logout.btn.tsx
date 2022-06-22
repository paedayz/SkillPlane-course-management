import { Button } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { device } from "../../constants";
import { resetCourseSlice } from "../../slices/course.slice";
import { resetUserSlice } from "../../slices/user.slice";

const Container = styled(Button)`
  @media ${device.ipad} {
    font-size: 10px;
    width: 60px;
    height: 25px;
    text-align: center;
  }
`;

type Props = {};

function LogoutButton(_: Props) {
  const username = useAppSelector((state) => state.user.username);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const onclickLogout = async () => {
    if (!username) return;

    const res = await logout(username);
    if (res) {
      history.push("/login");
      dispatch(resetUserSlice());
      dispatch(resetCourseSlice());
    }
  };
  return (
    <Container danger onClick={onclickLogout}>
      logout
    </Container>
  );
}

export default LogoutButton;

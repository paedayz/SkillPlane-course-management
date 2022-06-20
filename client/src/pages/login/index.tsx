import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../slices/user.slice";
import { LoadingOutlined, LockFilled, UserOutlined } from "@ant-design/icons";
import { device } from "../../constants";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// styled
const Container = styled.div`
  text-align: center;
  background-color: #ceefff;
  width: 100%;
  height: 100vh;
`;

const BoxForm = styled.div`
  width: 40%;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;

  @media ${device.ipad} {
    width: 70%;
  }

  @media ${device.mobile} {
    width: 90%;
  }
`;
const Title = styled.div`
  font-size: 38px;
  font-weight: bold;
  padding-top: 8%;
`;

export const InputUsername = styled(Input)`
  margin: 0;
  border-radius: 30px;
  height: 50px;
  font-size: 24px;
  border-color: #a2b4fa;
  @media ${device.mobile} {
    width: 80%;
  }
`;

export const InputPassword = styled(Input.Password)`
  margin: 0;
  border-radius: 30px;
  height: 50px;
  font-size: 24px;
  border-color: #a2b4fa;
  margin-bottom: 10px;
  @media ${device.mobile} {
    width: 80%;
  }
`;

export const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    padding-top: 12px;
    padding-right: 10px;
  }
  .ant-input {
    font-size: 20px;
  }
`;
export const ButtonLoginForm = styled(Button)`
  border-radius: 30px;
  background-color: #6adb89;
  color: white;
  height: 50px;
  font-size: 16px;
  margin: 0 auto;
  display: block;
  width: 213px;
  font-weight: bolder;
  font-size: 20px;
`;
interface IFormInput {
  username?: string;
  password?: string;
}

type Props = {};

function LoginPage(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const onFinish = async (values: IFormInput) => {
    if (values.username && values.password) {
      setIsLoading(true);
      const res = await login(values.username, values.password);
      if (!res) return;
      dispatch(setCredentials());
      history.push("/");
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Title>Login</Title>
      <BoxForm>
        <Form initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
          <FormItem name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <InputUsername placeholder="Username" prefix={<UserOutlined />} />
          </FormItem>

          <FormItem name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <InputPassword placeholder="Password" prefix={<LockFilled />} />
          </FormItem>

          <Form.Item>
            <Link style={{ fontSize: "20px" }} to="register">
              Register ?
            </Link>
          </Form.Item>

          <Form.Item>
            <ButtonLoginForm disabled={isLoading} htmlType="submit">
              {isLoading ? <Spin indicator={antIcon}/> : "Submit"}
            </ButtonLoginForm>
          </Form.Item>
        </Form>
      </BoxForm>
    </Container>
  );
}

export default LoginPage;
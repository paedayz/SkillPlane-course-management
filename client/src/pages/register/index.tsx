import { Button, DatePicker, Form, Input, Radio } from "antd";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../slices/user.slice";

// styled
const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

interface IFormInput {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  nickname: string;
  birthday: string;
  gender: string;
}

type Props = {};

function RegisterPage(props: Props) {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const onFinish = async (values: IFormInput) => {
    const res = await register(
      values.username,
      values.password,
      values.confirmPassword,
      values.firstname,
      values.lastname,
      values.nickname,
      values.birthday,
      values.gender,
    )

    if(res) {
      dispatch(setCredentials())
      history.push('/')
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input confirm password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[{ required: true, message: "Please input your nickname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="birthday"
          rules={[{ required: true, message: "Please input your birthday!" }]}
        >
          <DatePicker format={'MM-DD-YYYY'} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
        >
          <Radio.Group>
            <Radio value="male"> male </Radio>
            <Radio value="female"> female </Radio>
            <Radio value="LGBTQA+"> LGBTQA+ </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Link to="login">Login ?</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default RegisterPage;

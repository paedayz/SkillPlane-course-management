import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../api";
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
  username?: string;
  password?: string;
}

type Props = {};

function LoginPage(props: Props) {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()
  const onFinish = async (values: IFormInput) => {
    if(values.username && values.password) {
        setLoading(true)
        const res = await login(values.username, values.password)
        if(!res) return
        dispatch(setCredentials())
        history.push('/')
    }

    setLoading(false)
    
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Link to="register">Register ?</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button disabled={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default LoginPage;

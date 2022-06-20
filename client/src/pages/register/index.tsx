import { Button, DatePicker, Form, Input, Radio } from "antd";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { device } from "../../constants";
import { setCredentials } from "../../slices/user.slice";

// styled
const Container = styled.div`
  text-align: center;
  background-color: #ceefff;
  width: 100%;
  height: 110vh;
  @media ${device.mobile} {
    height: 200vh;
  }
`;

const BoxForm = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 30px;
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content: center;
  @media ${device.ipad} {
    display: flex;
    justify-content: center;
    width: 70%;
    height: 60vh;
    margin-top: 0;
    top: 40%;
  }

  @media ${device.mobile} {
    position: relative;
    width: 90%;
    height: 160vh;
    top: 42%;
    display: block;
    padding: 15px;
  }
`;

const Title = styled.div`
  font-size: 38px;
  font-weight: bold;
  padding-top: 10px;
  z-index: 1;
  position: relative;
`;

export const InputForm = styled(Input)`
  border-radius: 30px;
  height: 45px;
  font-size: 24px;
  border-color: #90d4ff;
`;

export const InputPassword = styled(Input.Password)`
  border-radius: 30px;
  height: 45px;
  font-size: 24px;
  border-color: #90d4ff;
`;

export const InputConfirmPassword = styled(Input.Password)`
  border-radius: 30px;
  height: 45px;
  font-size: 24px;
  border-color: #90d4ff;
  margin-left: 8px;
  width: 98%;
`;

export const FormItem = styled(Form.Item)`
  margin-top: 25px;
  .ant-form-item-label > label {
    padding-top: 12px;
    padding-right: 10px;
    font-weight: bolder;
    font-size: 16px;
  }
  .ant-input {
    font-size: 18px;
  }
`;
export const ButtonRegister = styled(Button)`
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
  const dispatch = useAppDispatch();
  const history = useHistory();
  const onFinish = async (values: IFormInput) => {
    const res = await register(
      values.username,
      values.password,
      values.confirmPassword,
      values.firstname,
      values.lastname,
      values.nickname,
      values.birthday,
      values.gender
    );

    if (res) {
      dispatch(setCredentials());
      history.push("/");
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <BoxForm>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <FormItem
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <InputForm placeholder="Username" />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <InputPassword placeholder="Password" />
          </FormItem>

          <FormItem
            label="Confirm"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm password!" },
            ]}
          >
            <InputConfirmPassword placeholder="Confirm password" />
          </FormItem>

          <FormItem
            label="Firstname"
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <InputForm placeholder="Firstname" />
          </FormItem>

          <FormItem
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <InputForm placeholder="Lastname" />
          </FormItem>

          <FormItem
            label="Nickname"
            name="nickname"
            rules={[{ required: true, message: "Please input your nickname!" }]}
          >
            <InputForm placeholder="Nickname" />
          </FormItem>

          <FormItem
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker format={"MM-DD-YYYY"} />
          </FormItem>

          <FormItem label="Gender" name="gender">
            <Radio.Group>
              <Radio value="male"> male </Radio>
              <Radio value="female"> female </Radio>
              <Radio value="LGBTQA+"> LGBTQA+ </Radio>
            </Radio.Group>
          </FormItem>

          <FormItem>
            <Link style={{ fontSize: "20px" }} to="login">
              Login ?
            </Link>
          </FormItem>

          <FormItem>
            <ButtonRegister htmlType="submit">Submit</ButtonRegister>
          </FormItem>
        </Form>
      </BoxForm>
    </Container>
  );
}

export default RegisterPage;

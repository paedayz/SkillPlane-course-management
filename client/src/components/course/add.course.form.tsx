import { Form, Input, Button } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DateField, { IRegisterDate } from "../../common/field/Date.filed";
import TextField from "../../common/field/Text.field";
import TimeField from "../../common/field/Time.field";
import UploadField from "../../common/field/Upload.field";

const Container = styled.div`
  height: 500px;
  overflow-y: scroll;
  padding-bottom: 50px;
`;

const Content = styled.div`
  padding: 0px 20px 0px 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled(Button)`
  margin-top: 30px;
`;

type Props = {};

function AddCourseForm({}: Props) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [numberOfStudent, setNumberOfStudent] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [image, setImage] = useState<UploadFile>()
  const [startEndTime, setStartEndTime] = useState<IRegisterDate>()

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Container>
      <Content>
        <TextField
          type="text"
          isRequired={true}
          title="Name"
          onChangeHandler={(value: string) => setName(value)}
        />

        <TextField
          type="text"
          isRequired={true}
          title="Description"
          onChangeHandler={(value: string) => setDescription(value)}
        />

        <TextField
          type="text"
          isRequired={true}
          title="Category"
          onChangeHandler={(value: string) => setCategory(value)}
        />

        <TextField
          type="text"
          isRequired={true}
          title="Subject"
          onChangeHandler={(value: string) => setSubject(value)}
        />

        <TextField
          type="number"
          defaultValue={0}
          isRequired={true}
          title="Number of student"
          onChangeHandler={(value: number) => setNumberOfStudent(value)}
        />

        <UploadField
          title="Image"
          isRequired={true}
          onChangeHandler={(fileList) => setImage(fileList[0])}
        />

        <TimeField
          title="Duration"
          isRequired={true}
          onChangeHandler={(value) => setDuration(value)}
        />

        <DateField
          title="Start-End register date"
          isRequired={true}
          onChangeHandler={(value) => setStartEndTime(value)}
        />

        <ButtonContainer>
          <SaveButton type="primary">Save</SaveButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default AddCourseForm;

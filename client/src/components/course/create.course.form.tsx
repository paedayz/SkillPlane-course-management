import { Form, Input, Button } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createCourse } from "../../api/course.api";
import { useAppDispatch } from "../../app/hooks";
import DateField, { IRegisterDate } from "../../common/field/Date.filed";
import TextField from "../../common/field/Text.field";
import TimeField from "../../common/field/Time.field";
import UploadField from "../../common/field/Upload.field";
import { openNotificationWithIcon } from "../../common/notification";
import { createdCourse } from "../../slices/course.slice";

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

type Props = {
  closeModal: Function;
};

function CreateCourse({ closeModal }: Props) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [numberOfStudent, setNumberOfStudent] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [images, setImages] = useState<UploadFile[]>([]);
  const [startEndTime, setStartEndTime] = useState<IRegisterDate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const setToInitialState = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubject("");
    setNumberOfStudent(0);
    setDuration(0);
    setImages([])
    setStartEndTime(undefined)
  };

  const onClickSubmit = async () => {
    const isEmptyData = checkIsEmptyData();
    if (isEmptyData) {
      openNotificationWithIcon(
        "error",
        "Error input",
        "some field are incorrect or empty"
      );
    } else {
      setIsLoading(true);
      let formData = getFormData();
      const resCourse = await createCourse(formData);

      if (resCourse) {
        dispatch(createdCourse(resCourse));
        setToInitialState();
        closeModal();
        // openNotificationWithIcon(
        //   "error",
        //   "Error input",
        //   "some field are incorrect or empty"
        // );
      } else {
        setIsLoading(false);
      }
    }
  };

  const getFormData = (): FormData => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subject", subject);
    formData.append("startTime", startEndTime?.startTime as string);
    formData.append("endTime", startEndTime?.endTime as string);
    formData.append("numberOfStudent", numberOfStudent.toString());
    formData.append("duration", (duration as number).toString());
    formData.append("image", (images as UploadFile[])[0].originFileObj as any);
    return formData;
  };

  const checkIsEmptyData = (): boolean => {
    let isEmptyData = false;
    if (name === "") isEmptyData = true;
    if (description === "") isEmptyData = true;
    if (category === "") isEmptyData = true;
    if (subject === "") isEmptyData = true;
    if (numberOfStudent === 0) isEmptyData = true;
    if (!duration || duration === 0) isEmptyData = true;
    if (!images || images.length === 0) isEmptyData = true;
    if (!startEndTime || !startEndTime.startTime || !startEndTime.endTime)
      isEmptyData = true;

    return isEmptyData;
  };
  return (
    <Container>
      <Content>
        <TextField
          value={name}
          type="text"
          isRequired={true}
          title="Name"
          onChangeHandler={(value: string) => setName(value)}
        />

        <TextField
          value={description}
          type="text"
          isRequired={true}
          title="Description"
          onChangeHandler={(value: string) => setDescription(value)}
        />

        <TextField
          value={category}
          type="text"
          isRequired={true}
          title="Category"
          onChangeHandler={(value: string) => setCategory(value)}
        />

        <TextField
          value={subject}
          type="text"
          isRequired={true}
          title="Subject"
          onChangeHandler={(value: string) => setSubject(value)}
        />

        <TextField
          value={numberOfStudent}
          type="number"
          defaultValue={0}
          isRequired={true}
          title="Number of student"
          onChangeHandler={(value: number) => setNumberOfStudent(value)}
        />

        <UploadField
          fileList={images}
          setFileList={setImages}
          title="Image"
          isRequired={true}
        />

        <TimeField
          value={duration}
          title="Duration"
          isRequired={true}
          onChangeHandler={(value) => setDuration(value)}
        />

        <DateField
          value={startEndTime}
          title="Start-End register date"
          isRequired={true}
          onChangeHandler={(value) => setStartEndTime(value)}
        />

        <ButtonContainer>
          <SaveButton
            disabled={isLoading || checkIsEmptyData()}
            type="primary"
            onClick={onClickSubmit}
          >
            Save
          </SaveButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default CreateCourse;

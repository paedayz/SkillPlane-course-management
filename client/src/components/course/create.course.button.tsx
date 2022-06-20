import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip, Button, Modal, TimePicker } from "antd";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import CreateCourseForm from "./create.course.form";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0px 30px 30px 0px;

  .ant-btn:focus {
    background-color: #92e692 !important;
    border: white;
    color: white;
  }

  .ant-btn:hover {
    background-color: #92e692 !important;
    border: white;
    color: white;
  }
`;

const AddButton = styled(Button)`
  width: 60px;
  height: 60px;
  background-color: #92e692;
  color: white;
`;

type Props = {};

function AddCrouseButton({}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  
  return (
    <Container>
      <Tooltip title="Create Course">
        <AddButton
          color="green"
          onClick={showModal}
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Tooltip>

      <Modal
        title="Create Course"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        bodyStyle={{ padding: '0' }}
        style={{padding:0}}
      >
        <CreateCourseForm closeModal={handleModalCancel} />
      </Modal>
    </Container>
  );
}

export default AddCrouseButton;

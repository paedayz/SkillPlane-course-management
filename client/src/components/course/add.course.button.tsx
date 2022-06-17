import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip, Button, Modal } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

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
  background-color: #92e692;
  color: white;

  
`;

type Props = {};

function AddCrouseButton({}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Container>
      <Tooltip title="Add Course">
        <AddButton
          color="green"
          size="large"
          onClick={showModal}
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Tooltip>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Container>
  );
}

export default AddCrouseButton;

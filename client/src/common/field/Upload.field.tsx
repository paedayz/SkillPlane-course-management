import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 15px;
`

const TitleContainer = styled.div`
  display: flex;
`;

const IsRequired = styled.div`
  color: red;
`;

type Props = {
  title: string;
  max ?: number;
  isRequired: boolean;
  onChangeHandler(data: UploadFile[]) : void;
};

const UploadField = ({ title, isRequired, max = 1, onChangeHandler }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Container>
        <TitleContainer>
        <div>{title}</div>
        {isRequired && <IsRequired>*</IsRequired>}
        </TitleContainer>
      
      <ImgCrop rotate aspect={16 / 10}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          customRequest={async (options: any) => {
            onChangeHandler(fileList)
            options.onSuccess("Ok");
          }}
        >
          {fileList.length < max && "+ Upload"}
        </Upload>
      </ImgCrop>
    </Container>
  );
};

export default UploadField;

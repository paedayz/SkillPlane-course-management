import { Input } from "antd";
import React from "react";
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
  placeholder?: string;
  isRequired: boolean;
  type: "number" | "text";
  defaultValue? : string| number;
  onChangeHandler(value: string | number): void;
};

function TextField({
  title,
  placeholder = 'type here',
  isRequired,
  type,
  defaultValue,
  onChangeHandler,
}: Props) {
  return (
    <Container>
      <TitleContainer>
        <div>{title}</div>
        {isRequired && <IsRequired>*</IsRequired>}
      </TitleContainer>

      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) =>
          onChangeHandler(
            type === "number" ? parseInt(e.target.value) : e.target.value
          )
        }
      />
    </Container>
  );
}

export default TextField;

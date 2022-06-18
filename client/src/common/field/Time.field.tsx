import { Input, TimePicker } from "antd";
import moment, { Moment } from "moment";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const IsRequired = styled.div`
  color: red;
`;

type Props = {
  title: string;
  isRequired: boolean;
  onChangeHandler(value: number): void;
};

function TimeField({ title, isRequired, onChangeHandler }: Props) {
  const onChange = (_: Moment | null, timeString: string) => {
    if (timeString) {
      const [hours, minutes, seconds] = timeString.split(":");
      const totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
      onChangeHandler(totalSeconds);
    } else {
      onChangeHandler(0);
    }
  };
  return (
    <Container>
      <TitleContainer>
        <div>{title}</div>
        {isRequired && <IsRequired>*</IsRequired>}
      </TitleContainer>

      <TimePicker
        showNow={false}
        onChange={onChange}
        defaultValue={moment("00:00:00", "HH:mm:ss")}
      />
    </Container>
  );
}

export default TimeField;

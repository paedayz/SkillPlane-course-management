import { DatePicker, Input, TimePicker } from "antd";
import moment, { Moment } from "moment";
import React from "react";
import styled from "styled-components";
import { RangeValue } from '../../../node_modules/rc-picker/lib/interface'

const { RangePicker } = DatePicker;
const dateFormat = "MM-DD-YYYY";

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
  onChangeHandler(value: IRegisterDate): void;
};

export interface IRegisterDate {
  startTime: string | undefined;
  endTime: string | undefined;
}

function DateField({ title, isRequired, onChangeHandler }: Props) {
  const onChange = (range: RangeValue<moment.Moment>) => {
    if (range) {
      onChangeHandler({
        startTime: range[0]?.format().split("T")[0],
        endTime: range[1]?.format().split("T")[0],
      });
    }
  }
  
  return (
    <Container>
      <TitleContainer>
        <div>{title}</div>
        {isRequired && <IsRequired>*</IsRequired>}
      </TitleContainer>

      <RangePicker
        format={dateFormat}
        onChange={onChange}
      />
    </Container>
  );
}

export default DateField;

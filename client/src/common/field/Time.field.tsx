import { TimePicker } from "antd";
import moment, { Moment } from "moment";
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
  value: number;
  onChangeHandler(value: number): void;
};

function TimeField({ title, isRequired, value, onChangeHandler }: Props) {
  const secondToTimestring = (second: number) => {
    const date = new Date(0);
    date.setSeconds(second);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

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
        value={moment(secondToTimestring(value), "HH:mm:ss")}
        showNow={false}
        onChange={onChange}
      />
    </Container>
  );
}

export default TimeField;

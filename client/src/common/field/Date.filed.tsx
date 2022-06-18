import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";
import { RangeValue } from "../../../node_modules/rc-picker/lib/interface";

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
  value?: IRegisterDate;
  onChangeHandler(value: IRegisterDate): void;
};

export interface IRegisterDate {
  startTime: string | undefined;
  endTime: string | undefined;
}

function DateField({ title, isRequired, value, onChangeHandler }: Props) {
  const createRangeMomentValue = (
    data?: IRegisterDate
  ): RangeValue<moment.Moment> => {
    if (!data) return [null, null];
    return [
      moment(data.startTime, "YYYY-MM-DD"),
      moment(data.endTime, "YYYY-MM-DD"),
    ];
  };
  const onChange = (range: RangeValue<moment.Moment>) => {
    if (range) {
      onChangeHandler({
        startTime: range[0]?.format().split("T")[0],
        endTime: range[1]?.format().split("T")[0],
      });
    }
  };

  return (
    <Container>
      <TitleContainer>
        <div>{title}</div>
        {isRequired && <IsRequired>*</IsRequired>}
      </TitleContainer>

      <RangePicker
        value={createRangeMomentValue(value)}
        format={dateFormat}
        onChange={onChange}
      />
    </Container>
  );
}

export default DateField;

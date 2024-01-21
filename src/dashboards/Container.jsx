import { Statistic, Typography } from "antd";
import CountUp from "react-countup";
import { COLORS } from "../../utils";
import "./Container.css";
const { Title } = Typography;

const formatter = (value) => <CountUp end={value} separator="," />;

export default function Container(props) {
  const additionalStyles = {};
  const addtionalStatValueStyle = {};
  const {
    minWidth,
    maxHeight,
    grow,
    shrink,
    stats = false,
    prefix = "",
    changeColor = false,
  } = props;
  if (minWidth) {
    additionalStyles.minWidth = minWidth;
  }
  if (maxHeight) {
    additionalStyles.maxHeight = maxHeight;
  }
  if (grow) {
    additionalStyles.flexGrow = 1;
  }
  if (shrink) {
    additionalStyles.flexShrink = 1;
  }
  if (stats) {
    additionalStyles.textAlign = "left";
    additionalStyles.padding = "12px 24px";
    if (changeColor) {
      if (props.value > 0) {
        addtionalStatValueStyle.color = COLORS.DARK_GREEN;
      } else if (props.value < 0) {
        addtionalStatValueStyle.color = COLORS.DARK_RED;
      }
    }
  }
  return (
    <div
      className="stats-container"
      style={{
        ...additionalStyles,
      }}
    >
      {!stats ? (
        <>
          <Title level={4}>{props.title}</Title>
          {props.children}
        </>
      ) : (
        <Statistic
          title={props.title}
          value={props.value}
          precision={2}
          formatter={typeof props.value === "number" && formatter}
          prefix={prefix}
          valueStyle={{ ...addtionalStatValueStyle }}
        />
      )}
    </div>
  );
}

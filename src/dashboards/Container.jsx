import { Progress, Statistic, Tooltip, Typography } from "antd";
import CountUp from "react-countup";
import { COLORS } from "../../utils";
import "./Container.css";
const { Title } = Typography;

const formatter = (value) => <CountUp end={value} separator="," />;
const bar = ({ win, lose }) => {
  const percent = Math.round((win / (win + lose)) * 100);
  return (
    <Tooltip title={`Won: ${win}  Lost: ${lose}`}>
      <Progress
        percent={percent}
        style={{ width: 300 }}
        strokeColor={COLORS.DARK_GREEN}
        trailColor={COLORS.DARK_RED}
        strokeWidth={16}
      />
    </Tooltip>
  );
};

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
    isBar,
    countup = true,
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
      ) : isBar ? (
        <Statistic
          className="bar-stats"
          title={props.title}
          value={props.value}
          precision={2}
          formatter={typeof props.value === "object" && bar}
          prefix={prefix}
          valueStyle={{ ...addtionalStatValueStyle }}
        />
      ) : (
        <Statistic
          title={props.title}
          value={props.value}
          precision={2}
          formatter={typeof props.value === "number" && countup && formatter}
          prefix={prefix}
          valueStyle={{ ...addtionalStatValueStyle }}
        />
      )}
    </div>
  );
}

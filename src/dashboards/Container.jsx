import { Typography } from "antd";
const { Title } = Typography;

export default function Container(props) {
  const additionalStyles = {};
  const { minWidth, maxHeight, grow, shrink } = props;
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#16161a",
        borderRadius: 8,
        padding: 12,
        minWidth: 400,
        ...additionalStyles,
      }}
    >
      <Title level={4}>{props.title}</Title>
      {props.children}
    </div>
  );
}

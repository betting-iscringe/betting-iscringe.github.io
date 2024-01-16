import { Typography } from "antd";
const { Title } = Typography;

export default function Container(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#16161a",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <Title level={4}>{props.title}</Title>
      {props.children}
    </div>
  );
}

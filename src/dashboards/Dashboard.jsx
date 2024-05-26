import { lazy, Suspense } from "react";
import { Spin } from "antd";
import Container from "./Container";
import ProfitGraph from "./ProfitGraph";
import Stats from "./Stats";

const BettingHistory = lazy(() => import("./BettingHistory"));

export default function Dashboard(props) {
  const { totalUserBets } = props;

  return (
    <div
      style={{
        gap: 4,
        display: "flex",
        margin: 8,
        width: "100%",
        flexWrap: "wrap",
        boxSizing: "border-box",
        maxHeight: "calc(96vh - 44px)",
        minHeight: 0,
      }}
    >
      <Stats totalUserBets={totalUserBets} />
      <Container title="Profit/Loss" minWidth={300} grow>
        <ProfitGraph totalUserBets={totalUserBets} />
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 1,
        }}
      >
        <Container title="Bet History" maxHeight={760}>
          <Suspense fallback={<Spin size="large" />}>
            <BettingHistory totalUserBets={totalUserBets} />
          </Suspense>
        </Container>
      </div>
    </div>
  );
}

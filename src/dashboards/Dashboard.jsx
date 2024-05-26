import { lazy, Suspense } from "react";
import { Spin } from "antd";
import Container from "./Container";

import Stats from "./Stats";

const ProfitGraph = lazy(() => import("./ProfitGraph"));
const BettingHistory = lazy(() => import("./BettingHistory"));

export default function Dashboard(props) {
  const { totalUserBets } = props;
  const hasBets = totalUserBets?.length !== 0;

  return (
    <div
      style={{
        gap: 4,
        display: "flex",
        margin: 8,
        width: "100%",
        flexWrap: "wrap",
        boxSizing: "border-box",
        height: "calc(96vh - 68px)",
        minHeight: 0,
      }}
    >
      <Stats totalUserBets={totalUserBets} />
      <Container title="Profit/Loss" minWidth={300} grow>
        {hasBets && (
          <Suspense fallback={<Spin size="large" />}>
            <ProfitGraph totalUserBets={totalUserBets} />
          </Suspense>
        )}
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 1,
          height: "calc(96vh - 44px)",
          maxHeight: 760,
          width: 400,
          maxWidth: "90vw",
        }}
      >
        <Container title="Bet History" grow>
          <BettingHistory totalUserBets={totalUserBets} />
        </Container>
      </div>
    </div>
  );
}

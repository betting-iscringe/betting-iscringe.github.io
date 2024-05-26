import BetDetails from "./BetDetails";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const Virtuoso = lazy(() => import("../../utils/LazyVirtuso"));

const BettingHistory = (props) => {
  const { totalUserBets } = props;
  const reversedData = totalUserBets.toReversed();
  const hasManyBets = totalUserBets?.length > 200;
  return hasManyBets ? (
    <Suspense fallback={<Spin size="large" />}>
      <Virtuoso
        style={{ height: "100%", width: 400, maxWidth: "90vw", maxHeight: 760 }}
        data={reversedData}
        itemContent={(_, bet) => (
          <BetDetails bet={bet} key={bet.betId} animation={false} />
        )}
      />
    </Suspense>
  ) : (
    <div
      style={{
        height: "100%",
        maxHeight: 689,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {totalUserBets.toReversed().map((bet) => (
        <BetDetails bet={bet} key={bet.betId} />
      ))}
    </div>
  );
};
export default BettingHistory;

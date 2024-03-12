import BetDetails from "./BetDetails";

const BettingHistory = (props) => {
  const { totalUserBets } = props;
  return (
    <div
      style={{
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

import BetDetails from "./BetDetails";

const BettingHistory = (props) => {
  const { totalUserBets } = props;
  return (
    <div
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        gap: 4,
      }}
    >
      {totalUserBets.map((bet) => (
        <BetDetails bet={bet} />
      ))}
    </div>
  );
};
export default BettingHistory;

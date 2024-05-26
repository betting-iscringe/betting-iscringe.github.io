import BetDetails from "./BetDetails";
import { Virtuoso } from "react-virtuoso";

const BettingHistory = (props) => {
  const { totalUserBets } = props;
  const reversedData = totalUserBets.toReversed();
  return (
    <Virtuoso
      style={{ height: "100%", width: 400, maxWidth: "90vw", maxHeight: 760 }}
      data={reversedData}
      itemContent={(_, bet) => <BetDetails bet={bet} key={bet.betId} />}
    />
  );
};
export default BettingHistory;

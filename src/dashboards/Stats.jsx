import { useEffect, useState } from "react";
import Container from "./Container";

const StatDisplay = (props) => <Container minWidth="0px" stats {...props} />;

const Stats = (props) => {
  const { totalUserBets } = props;
  const [betCount, setBetCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let betNumber = 0;
    let totalBetAmount = 0;
    const profit = totalUserBets.reduce((acc, bet) => {
      const { totalPool, winOption, winning, userBets } = bet;
      userBets.forEach((userBet) => {
        const { betAmount, option } = userBet;
        betNumber += 1;
        totalBetAmount += betAmount;
        if (option === winOption) {
          acc += (betAmount / winning) * totalPool;
        }
        acc -= betAmount;
      });
      return acc;
    }, 0);
    setBetCount(betNumber);
    setProfit(profit);
    setTotalAmount(totalBetAmount);
  }, [totalUserBets]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "100%",
        gap: 8,
        marginBottom: 4,
      }}
    >
      <StatDisplay title="Profit" value={profit} changeColor prefix="$" />
      <StatDisplay title="Total Bets" value={betCount} />
      <StatDisplay title="Total Bet Amount" value={totalAmount} prefix="$" />
    </div>
  );
};

export default Stats;

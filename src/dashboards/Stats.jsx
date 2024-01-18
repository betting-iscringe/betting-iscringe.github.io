import { useEffect, useState } from "react";
import Container from "./Container";

const StatDisplay = (props) => {
  const { children, ...rest } = props;
  return <Container minWidth="0px" stats {...rest} />;
};

const Stats = (props) => {
  const { totalUserBets } = props;
  const [betCount, setBetCount] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    let betNumber = 0;
    const profit = totalUserBets.reduce((acc, bet) => {
      const { totalPool, winOption, winning, userBets } = bet;
      userBets.forEach((userBet) => {
        betNumber += 1;
        const { betAmount, option } = userBet;
        if (option === winOption) {
          acc += (betAmount / winning) * totalPool;
        }
        acc -= betAmount;
      });
      return acc;
    }, 0);
    setBetCount(betNumber);
    setProfit(profit);
  }, [totalUserBets]);

  return (
    <div
      style={{
        display: "flex",
        minWidth: "100%",
        gap: 8,
        marginBottom: 4,
      }}
    >
      <StatDisplay title="Profit" value={profit} changeColor prefix="$" />
      <StatDisplay title="Total Bets" value={betCount} />
    </div>
  );
};

export default Stats;

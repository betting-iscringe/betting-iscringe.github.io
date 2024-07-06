import { useMemo } from "react";
import StatDisplay from "./StatsDisplay";

const Stats = (props) => {
  const { totalUserBets } = props;

  const {
    betCount = 0,
    profit = 0,
    totalAmount = 0,
    betResults = 0,
  } = useMemo(() => {
    let betNumber = 0;
    let totalBetAmount = 0;
    const userProfit = totalUserBets.reduce((acc, bet) => {
      const { totalPool, winOption, winning, userBets } = bet;
      userBets.forEach(({ betAmount, option }) => {
        betNumber += 1;
        totalBetAmount += betAmount;
        if (option === winOption) {
          acc += (betAmount / winning) * totalPool;
        }
        acc -= betAmount;
      });
      return acc;
    }, 0);

    const winLoss = totalUserBets.reduce(
      (acc, bettingpool) => {
        bettingpool.userBets.forEach((bet) => {
          if (bet.option === bettingpool.winOption) {
            acc.win += 1;
          } else {
            acc.lose += 1;
          }
        });
        return acc;
      },
      { win: 0, lose: 0 }
    );
    return {
      betCount: betNumber,
      profit: userProfit,
      totalAmount: totalBetAmount,
      betResults: winLoss,
    };
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
      <StatDisplay title="Bet Summary" value={betResults} isBar />
    </div>
  );
};

export default Stats;

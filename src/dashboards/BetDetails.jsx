import { Tooltip } from "antd";
import StatDisplay from "./StatsDisplay";
import { commaMaker } from "../../utils";
import "./BetDetails.css";

const BetDetails = (props) => {
  const {
    bet: {
      topic,
      userBets,
      winOption,
      betId,
      optionsObject,
      winning,
      totalPool,
    },
  } = props;
  let initial = userBets.reduce((acc, userBet) => {
    const { betAmount, option } = userBet;
    if (option === winOption) {
      acc += (betAmount / winning) * totalPool;
    }
    acc -= betAmount;
    return acc;
  }, 0);

  return (
    <div className="bet-details-container">
      <span className="bet-details-stat-container">
        <StatDisplay title="Pool" value={topic} />
        <StatDisplay
          title="Pool Profit"
          value={initial}
          changeColor
          prefix={"$"}
        />
      </span>

      <span className="bet-details-options-container">
        {userBets.map((userBet) => {
          const { option, betAmount } = userBet;
          return (
            <Tooltip title={"$" + commaMaker(betAmount)}>
              <div
                key={betId + userBet.option}
                className={`bet-details-option ${
                  option === winOption
                    ? "bet-details-option-win"
                    : "bet-details-option-loss"
                }`}
              >
                {optionsObject[option]}
              </div>
            </Tooltip>
          );
        })}
      </span>
    </div>
  );
};
export default BetDetails;

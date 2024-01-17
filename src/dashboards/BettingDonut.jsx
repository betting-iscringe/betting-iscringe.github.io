import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Text } from "recharts";
import { COLORS } from "../../utils";

const BettingDonut = (props) => {
  const [betResults, setBetResults] = useState();
  const [totalBets, setTotalBets] = useState();
  const { totalUserBets } = props;

  useEffect(() => {
    let total = 0;
    const winLoss = totalUserBets.reduce(
      (acc, bettingpool) => {
        bettingpool.userBets.forEach((bet) => {
          if (bet.option === bettingpool.winOption) {
            acc[0].value += 1;
          } else {
            acc[1].value += 1;
          }
          total += 1;
        });

        return acc;
      },
      [
        { name: "win", value: 0, fill: COLORS.GREEN },
        { name: "lose", value: 0, fill: COLORS.RED },
      ]
    );
    setBetResults(winLoss);
    setTotalBets(total);
  }, [totalUserBets]);

  const middleLabel = (props) => {
    const { cx, cy, fill } = props;
    let fillColor = "white";
    let text = "";
    if (betResults[0].value > betResults[1].value) {
      text = ((betResults[0].value / totalBets) * 100).toFixed(2) + "% WON";
      fillColor = COLORS.GREEN;
    } else {
      text = ((betResults[1].value / totalBets) * 100).toFixed(2) + "% LOST";
      fillColor = COLORS.RED;
    }

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fillColor}
          fillOpacity={0.8}
          fontSize={18}
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth={400}
      minHeight={400}
    >
      <PieChart>
        <Pie
          dataKey="value"
          data={betResults}
          innerRadius="60%"
          outerRadius="80%"
          fillOpacity={0.8}
          stroke={COLORS.BG}
          paddingAngle={2}
          startAngle={-270}
          endAngle={90}
          label={middleLabel}
          labelLine={false}
        />
        <Text textAnchor="middle" verticalAnchor="middle">
          test
        </Text>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default BettingDonut;

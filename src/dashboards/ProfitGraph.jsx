import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const gradientOffset = (data) => {
  const dataMax = Math.max(...data.map((i) => i.y));
  const dataMin = Math.min(...data.map((i) => i.y));

  if (dataMax <= 0) {
    return 0;
  } else if (dataMin >= 0) {
    return 1;
  } else {
    return dataMax / (dataMax - dataMin);
  }
};

const COLORS = {
  RED: "#FF2B2B",
  GREEN: "#2BFF2B",
};

const Dot = (props) => (
  <circle className="recharts-dot recharts-area-dot" {...props} />
);
export default function ProfitGraph(props) {
  const { totalUserBets } = props;
  const [offset, setOffset] = useState(0);
  const [profitTimeline, setProfitTimeline] = useState([]);

  const populateData = async () => {
    let initial = 0;
    const profitTimeline = totalUserBets.map((bet, i) => {
      const { totalPool, winOption, winning, userBets } = bet;
      userBets.forEach((userBet) => {
        const { betAmount, option } = userBet;
        if (option === winOption) {
          initial += (betAmount / winning) * totalPool;
        }
        initial -= betAmount;
      });
      return { x: bet.closingTime + i, y: initial };
    });
    setOffset(gradientOffset(profitTimeline));
    setProfitTimeline(profitTimeline);
  };

  useEffect(() => {
    populateData();
  }, [totalUserBets]);

  const generateDots = ({ value, ...rest }) => {
    const [, y] = value;
    if (y > 0) {
      return <Dot {...rest} fill={COLORS.GREEN} stroke={COLORS.GREEN} />;
    }
    return <Dot {...rest} fill={COLORS.RED} stroke={COLORS.RED} />;
  };

  const formatUnix = (timestamp) => {
    const a = new Date(timestamp);
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    return `${date}/${month}/${year}`;
  };

  return (
    <AreaChart
      width={800}
      height={600}
      data={profitTimeline}
      margin={{ top: 10, right: 20, left: 50, bottom: 10 }}
    >
      <XAxis dataKey="x" tickFormatter={formatUnix} />
      <YAxis />
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset={0} stopColor={COLORS.GREEN} stopOpacity={1} />
          <stop
            offset={offset - 0.08}
            stopColor={COLORS.GREEN}
            stopOpacity={0.2}
          />
          <stop offset={offset} stopColor="black" stopOpacity={0} />
          <stop
            offset={offset + 0.08}
            stopColor={COLORS.RED}
            stopOpacity={0.2}
          />
          <stop offset={1} stopColor={COLORS.RED} stopOpacity={1} />
        </linearGradient>
        <linearGradient id="splitColorLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset={offset} stopColor={COLORS.GREEN} stopOpacity={1} />
          <stop offset={offset} stopColor={COLORS.RED} stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        dot={profitTimeline.length > 120 ? false : generateDots}
        type="basis"
        dataKey="y"
        stroke="url(#splitColorLine)"
        fill="url(#splitColor)"
      />
    </AreaChart>
  );
}

import BettingDonut from "./BettingDonut";
import BettingHistory from "./BettingHistory";
import Container from "./Container";
import ProfitGraph from "./ProfitGraph";
import Stats from "./Stats";

export default function Dashboard(props) {
  const { totalUserBets } = props;

  return (
    <div
      style={{
        gap: 4,
        display: "flex",
        margin: 8,
        width: "100%",
        flexWrap: "wrap",
        boxSizing: "border-box",
      }}
    >
      <Stats totalUserBets={totalUserBets} />
      <Container title="Profit/Loss" minWidth={300} grow>
        <ProfitGraph totalUserBets={totalUserBets} />
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 1,
        }}
      >
        <Container title="Bet Summary">
          <BettingDonut totalUserBets={totalUserBets} />
        </Container>
        <Container title="Bet History" maxHeight={600}>
          <BettingHistory totalUserBets={totalUserBets} />
        </Container>
      </div>
    </div>
  );
}

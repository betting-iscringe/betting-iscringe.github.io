import BettingDonut from "./BettingDonut";
import Container from "./Container";
import ProfitGraph from "./ProfitGraph";

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
      <Container title="Profit/Loss" minWidth={300} grow>
        <ProfitGraph totalUserBets={totalUserBets} />
      </Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Container title="Bet Summary">
          <BettingDonut totalUserBets={totalUserBets} />
        </Container>
        <Container title="Bet History" maxHeight={600}>
          test
        </Container>
      </div>
    </div>
  );
}

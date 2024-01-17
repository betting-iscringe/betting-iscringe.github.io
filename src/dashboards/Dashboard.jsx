import BettingDonut from "./BettingDonut";
import Container from "./Container";
import ProfitGraph from "./ProfitGraph";

export default function Dashboard(props) {
  const { totalUserBets } = props;

  return (
    <div style={{ gap: 4, display: "flex", margin: 16 }}>
      <Container title="Profit/Loss" minWidth={600} grow>
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

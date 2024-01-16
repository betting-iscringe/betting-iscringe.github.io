import Container from "./Container";
import ProfitGraph from "./ProfitGraph";

export default function Dashboard() {
  return (
    <div style={{ gap: 4, display: "flex", margin: 16 }}>
      <Container title="Profit/Loss">
        <ProfitGraph />
      </Container>
      <Container title="Bet Summary">test</Container>
      <Container title="Bet History">test</Container>
    </div>
  );
}

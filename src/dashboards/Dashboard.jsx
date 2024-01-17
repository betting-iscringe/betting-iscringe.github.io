import Container from "./Container";
import ProfitGraph from "./ProfitGraph";

export default function Dashboard(props) {
  const { totalUserBets } = props;

  return (
    <div style={{ gap: 4, display: "flex", margin: 16 }}>
      <Container title="Profit/Loss">
        <ProfitGraph totalUserBets={totalUserBets} />
      </Container>
      <Container title="Bet Summary">too lazy to style this fuck</Container>
      <Container title="Bet History">test</Container>
    </div>
  );
}

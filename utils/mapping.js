const getUserBets = (
  totalData,
  userId = "726b5a5e-9dc0-438e-b6be-fb901a51f482"
) => {
  const totalUserBets = [];
  let allBets = {};
  Object.values(totalData).forEach((bettingEvent) => {
    allBets = { ...allBets, ...bettingEvent };

    Object.values(bettingEvent).forEach((bet) => {
      const {
        id: betId,
        topic,
        closingTime,
        options,
        userBets: optionbets,
        archive,
        winOption,
        totalPool,
      } = bet;
      if (archive) return;
      const userBets = [];
      Object.entries(optionbets).forEach(([option, optionbet]) => {
        const foundBet = optionbet.find((userbet) => userbet.userid === userId);
        if (foundBet) {
          userBets.push(foundBet);
        }
      });
      if (userBets.length !== 0) {
        let winning = optionbets[winOption].reduce(
          (acc, { betAmount }) => acc + betAmount,
          0
        );
        totalUserBets.push({
          betId,
          topic,
          closingTime,
          options,
          userBets,
          winOption,
          totalPool,
          winning,
        });
      }
    });
  });
  if (totalUserBets.length > 1)
    totalUserBets.sort((a, b) => a.closingTime - b.closingTime);
  return totalUserBets;
};
export default { getUserBets };

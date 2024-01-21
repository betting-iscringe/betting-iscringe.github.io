const getUserBets = (totalData, userId) => {
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
        const optionsObject = {};
        options.forEach((option) => {
          optionsObject[option.optionid] = option.option;
        });
        totalUserBets.push({
          betId,
          topic,
          closingTime,
          options,
          optionsObject,
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

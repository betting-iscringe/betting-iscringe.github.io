import { useMemo } from "react";
import { Table } from "antd";

const commaMaker = (value) => value.toLocaleString("en-US", { maximumFractionDigits: 2 });

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    width: 400,
  },
  {
    title: "Bet amount",
    dataIndex: "betAmount",
    key: "betAmount",
    sorter: (a, b) => a.betAmount - b.betAmount,
    render: commaMaker,
    width: 400,
  },
  {
    title: "Gross winnings",
    dataIndex: "winnings",
    key: "winnings",
    sorter: (a, b) => a.winnings - b.winnings,
    render: commaMaker,
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    sorter: (a, b) => a.profit - b.profit,
    render: commaMaker,
  },
];

export default (props) => {
  const {
    usernameFilter,
    events,
    dataHolder,
    eventHolder,
    checkedKeys,
    loading,
  } = props;

  const items = useMemo(() => {
    const usedData = dataHolder;
    const usedEvents = eventHolder;
    // Remove non alphanum
    const userFilter = usernameFilter.replace(/[^0-9a-z]/gi, "").toLowerCase();
    const userDirtyFilter = usernameFilter.toLowerCase();
    const users = {};
    usedEvents.forEach((eventName) => {
      const bettingPools = usedData?.[eventName];
      if (!bettingPools) return;
      const pools = Object.values(bettingPools);

      // Loop through all the pools and record each user's winnings
      pools.forEach((value) => {
        // Calculate total bet amount for winning choice
        const { id, userBets, winOption, totalPool, archive = false } = value;
        if (!checkedKeys.includes(id) || winOption === null) return;

        // special shit for archive data
        if (archive) {
          userBets.forEach(({ userid, username, winAmount }) => {
            const user = users?.[userid] || {
              userid,
              username,
              betAmount: 0,
              winnings: 0,
              profit: 0,
            };
            user.username = username;
            user.profit += winAmount;
            users[userid] = user;
          });
          return;
        }

        const winning = userBets[winOption].reduce(
          (acc, { betAmount }) => acc + betAmount,
          0
        );

        // Loop all bets and record total bet amount and winnings
        const options = Object.entries(userBets);
        options.forEach(([option, optionBets]) => {
          optionBets.forEach(({ userid, username, betAmount: amount }) => {
            const user = users?.[userid] || {
              userid,
              username,
              betAmount: 0,
              winnings: 0,
              profit: 0,
            };
            user.username = username;
            user.betAmount += amount;

            // Use ratio of bet amount to total winning bet amount
            // apply ratio to pool
            if (option == winOption) {
              user.winnings += (amount / winning) * totalPool;
            }
            users[userid] = user;
          });
        });
      });
    });

    return Object.values(users)
      .filter((user) => {
        if (usernameFilter) {
          const userCheck = user.username
            .replace(/[^0-9a-z]/gi, "")
            .toLowerCase();
          const userDirtyCheck = user.username.toLowerCase();
          return (
            (userFilter && userCheck.includes(userFilter)) ||
            userDirtyCheck.includes(userDirtyFilter)
          );
        }
        return true;
      })
      .map((user) => ({
        ...user,
        profit: user.profit + (user.winnings - user.betAmount),
      }))
      .sort((a, b) => b.profit - a.profit);
  }, [usernameFilter, events, dataHolder, eventHolder, checkedKeys]);

  return <Table columns={columns} loading={loading} dataSource={items} />;
};

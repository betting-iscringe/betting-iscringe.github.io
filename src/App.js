import { useMemo, useState } from "react";
import { FilterFilled } from "@ant-design/icons";
import { Table, Typography, Dropdown, Input, Tooltip, Select } from "antd";
import "./styles.css";

import Fights from "./Fights";
import { data, shitData, divegrassData } from "./data";

const { Option } = Select;
const { Title } = Typography;
const commaMaker = (value) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 2 });

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    width: 400
  },
  {
    title: "Bet amount",
    dataIndex: "betAmount",
    key: "betAmount",
    sorter: (a, b) => a.betAmount - b.betAmount,
    render: commaMaker,
    width: 400
  },
  {
    title: "Gross winnings",
    dataIndex: "winnings",
    key: "winnings",
    sorter: (a, b) => a.winnings - b.winnings,
    render: commaMaker
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    sorter: (a, b) => a.profit - b.profit,
    render: commaMaker
  }
];

const dataObject = {
  HFZ: { events: Object.keys(data), data },
  divegrass: { events: Object.keys(divegrassData), data: divegrassData },
  etc: { events: Object.keys(shitData), data: shitData }
};
export default function App() {
  const [event, setEvent] = useState("HFZ");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [eventVisible, setEventVisible] = useState(
    dataObject.HFZ.events.reduce((a, v) => ({ ...a, [v]: true }), {})
  );

  const items = useMemo(() => {
    const { data: usedData, events: usedEvents } = dataObject[event];
    // Remove non alphanum
    const userFilter = usernameFilter.replace(/[^0-9a-z]/gi, "").toLowerCase();
    const userDirtyFilter = usernameFilter.toLowerCase();
    const users = {};
    usedEvents.forEach((eventName) => {
      if (!eventVisible[eventName]) return;
      const bettingPools = usedData[eventName];
      const pools = Object.entries(bettingPools);
      const breakdown = {};

      // Loop through all the pools and record each user's winnings
      pools.forEach(([key, value]) => {
        // Calculate total bet amount for winning choice
        const { userBets, winOption, totalPool } = value;
        if (winOption === null) return;
        const winning = userBets[winOption].reduce(
          (acc, { betAmount }) => acc + betAmount,
          0
        );
        breakdown[key] = { total: totalPool, winning };

        // Loop all bets and record total bet amount and winnings
        const options = Object.values(userBets);
        options.forEach((option) => {
          option.forEach(({ userid, username, betAmount: amount, option }) => {
            const user = users?.[userid] || {
              userid,
              username,
              betAmount: 0,
              winnings: 0
            };
            user.username = username;
            user.betAmount += amount;

            // Use ratio of bet amount to total winning bet amount
            // apply ratio to pool
            if (option === winOption) {
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
        profit: user.winnings - user.betAmount
      }))
      .sort((a, b) => b.profit - a.profit);
  }, [usernameFilter, eventVisible, event]);

  const handleEvent = (event) => {
    const { events: usedEvents } = dataObject[event];
    setEventVisible(usedEvents.reduce((a, v) => ({ ...a, [v]: true }), {}));
    setEvent(event);
  };

  const options = ["HFZ", "divegrass", "etc"];

  return (
    <div className="App" style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <Title level={3} style={{ minWidth: 300 }}>
          Nasfaq {event} bet leaderboard
        </Title>
        <div
          style={{
            width: "25vw",
            minWidth: 300,
            padding: 4,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Select
            defaultValue={options[0]}
            style={{
              width: "8vw",
              minWidth: 150,
              marginTop: "0.5em",
              marginRight: "1.1vw"
            }}
            onChange={handleEvent}
          >
            {options.map((option, i) => (
              <Option key={i} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Filter usernames"
            allowClear
            onChange={(e) => setUsernameFilter(e.target.value)}
            style={{ width: "20vw", minWidth: 200 }}
          />
          <Tooltip title="Filter streams">
            <Dropdown
              overlay={
                <Fights
                  eventVisible={eventVisible}
                  setEventVisible={setEventVisible}
                  events={dataObject[event].events}
                />
              }
              trigger={["click"]}
              visible={dropdownVisible}
              onVisibleChange={setDropdownVisible}
            >
              <FilterFilled
                style={{
                  fontSize: 19,
                  paddingTop: "0.5em",
                  marginLeft: "1.1vw"
                }}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </Tooltip>
        </div>
      </div>
      <Table columns={columns} dataSource={items} />
    </div>
  );
}

import { useState } from "react"
import { FilterFilled, SyncOutlined } from "@ant-design/icons";
import { Typography, Dropdown, Input, Tooltip, Select } from "antd";

import Tree from "./Tree";

const { Option } = Select;
const { Title } = Typography;
const options = ["hfz", "divegrass", "etc"];

export default (props) => {
  const {
    events,
    setEvents,
    setUsernameFilter,
    checkedKeys,
    setCheckedKeys,
    expandedKeys,
    setExpandedKeys,
    treeData,
		loading,
		refreshData,
  } = props;
  const [treeVisible, setTreeVisible] = useState(false);

  const onRightClick = (e) => {
    e.preventDefault();
    if (checkedKeys.length === 0) {
      let keysHolder = treeData
        .map(({ key: parentKey, children }) => {
          let childrenKeys = children.map(({ key }) => key);
          childrenKeys.push(parentKey);
          return childrenKeys;
        })
        .flat();
      setCheckedKeys(keysHolder.filter((key) => !key.startsWith("EVENT_")));
    } else {
      setCheckedKeys([]);
      setExpandedKeys([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Title level={3} style={{ minWidth: 300 }}>
        Nasfaq {events.join(", ")} bet leaderboard{" "}
        <SyncOutlined
          spin={loading}
          onClick={refreshData}
          style={{
            marginLeft: 20,
            fontSize: 19,
          }}
        />
      </Title>
      <div
        style={{
          width: "35vw",
          minWidth: 300,
          padding: 4,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "18vw",
            minWidth: 150,
            marginTop: "0.5em",
            marginRight: "1.1vw",
          }}
          onChange={setEvents}
          value={events}
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
        <Tooltip title="Filter streams (right click unselects all)">
          <Dropdown
            overlay={
              <Tree
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                treeData={treeData}
                expandedKeys={expandedKeys}
                setExpandedKeys={setExpandedKeys}
              />
            }
            trigger={["click"]}
            visible={treeVisible}
            onVisibleChange={setTreeVisible}
            onContextMenu={onRightClick}
          >
            <FilterFilled
              style={{
                fontSize: 19,
                paddingTop: "0.5em",
                marginLeft: "1.1vw",
              }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </Tooltip>
      </div>
    </div>
  );
};

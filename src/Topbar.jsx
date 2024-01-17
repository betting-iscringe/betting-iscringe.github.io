import { useState } from "react"
import { FilterFilled, SyncOutlined } from "@ant-design/icons";
import { Typography, Dropdown, Input, Tooltip, Select, Switch } from "antd";

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
    usernameFilter,
    loading,
    refreshData,
    showDash,
    setShowDash,
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
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Title level={3} style={{ minWidth: 300 }}>
        Nasfaq {events.join(", ")} bet leaderboard{" "}
        <Tooltip title="shits experimental yo" placement="bottomRight">
          <Switch size="small" checked={showDash} onChange={setShowDash} />
        </Tooltip>
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
          width: "40vw",
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
            marginRight: "1.1vw",
            display: "grid",
          }}
          onChange={setEvents}
          value={events}
        >
          {options.map((option, i) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <Input
          placeholder={showDash ? "Search userId" : "Filter username"}
          allowClear
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          style={{ width: "20vw", minWidth: 200 }}
        />
        <Tooltip
          title="Filter streams (right click unselects all)"
          placement="bottomRight"
        >
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
            open={treeVisible}
            onOpenChange={setTreeVisible}
            onContextMenu={onRightClick}
          >
            <FilterFilled
              style={{
                fontSize: 19,
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

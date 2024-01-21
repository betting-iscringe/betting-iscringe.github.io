import { useState } from "react"
import { FilterFilled, SyncOutlined } from "@ant-design/icons";
import { Typography, Dropdown, Input, Tooltip, Select, Switch } from "antd";

import Tree from "./Tree";
import "./Topbar.css";

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
    handleSwitchClick,
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
    <div className="topbar-container">
      <Title level={3} className="topbar-title">
        Nasfaq {events.join(", ")} bet leaderboard{" "}
        <Tooltip title="try double clicking a user" placement="bottomRight">
          <Switch
            size="small"
            checked={showDash}
            onChange={handleSwitchClick}
          />
        </Tooltip>
        <SyncOutlined
          spin={loading}
          onClick={refreshData}
          className="topbar-sync"
        />
      </Title>
      <div className="topbar-control-container">
        <Select
          mode="multiple"
          allowClear
          className="topbar-control-events"
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
          className="topbar-control-filter"
        />
        {!showDash && (
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
                className="topbar-control-filter-icon"
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

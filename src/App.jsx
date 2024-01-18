import { useState, useEffect } from "react";
import { message } from "antd";
import "./styles.css";
import { dataSource, mapping } from "../utils";

import BetsTable from "./BetsTable";
import Topbar from "./Topbar";
import Dashboard from "./dashboards/Dashboard";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [dataHolder, setDataHolder] = useState({});
  const [eventHolder, setEventHolder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [showDash, setShowDash] = useState(false);
  const [totalUserBets, setTotalUserBets] = useState([]);

  useEffect(() => {
    getInitialData();
  }, []);


  useEffect(() => {
    document.title = `Nasfaq ${categories.join(", ")} betting board`;
    if (categories.length > 0) getData(categories);
  }, [categories]);

  useEffect(() => {
    initUserBets(dataHolder, usernameFilter);
  }, [usernameFilter, dataHolder]);

  const handleSwitchClick = (value) => {
    setUsernameFilter("");
    setShowDash(value);
  };
  const handleRowClick = (value) => {
    setUsernameFilter(value);
    setShowDash(true);
  };

  const getInitialData = async () => {
    const defaults = await dataSource.getDefault();
    setCategories(defaults);
  };

  const initUserBets = async (totalData, usernameFilter) => {
    setLoading(true);
    if (usernameFilter) {
      const userBets = mapping.getUserBets(totalData, usernameFilter);
      setTotalUserBets(userBets);
    } else {
      setTotalUserBets([]);
    }
    setLoading(false);
  };

  const refreshData = async () => {
    try {
      await getData(categories, false);
      message.success("Refresh successful", 0.5);
    } catch {}
  };

  const getData = async (categories, resetVisible = true) => {
    setLoading(true);
    const { totalData, usedEvents, treeDataHolder, keysHolder } =
      await dataSource.getAllEvents(categories);
    setDataHolder(totalData);
    setEventHolder(usedEvents);
    setTreeData(treeDataHolder);
    if (resetVisible) {
      setCheckedKeys(keysHolder.filter((key) => !key.startsWith("EVENT_")));
    } else {
      setCheckedKeys(checkedKeys);
      setExpandedKeys(expandedKeys);
    }
    setLoading(false);
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <Topbar
        events={categories}
        setEvents={setCategories}
        setUsernameFilter={setUsernameFilter}
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        expandedKeys={expandedKeys}
        setExpandedKeys={setExpandedKeys}
        treeData={treeData}
        usernameFilter={usernameFilter}
        loading={loading}
        refreshData={refreshData}
        showDash={showDash}
        handleSwitchClick={handleSwitchClick}
      />
      {showDash ? (
        <Dashboard totalUserBets={totalUserBets} />
      ) : (
        <BetsTable
          handleRowClick={handleRowClick}
          usernameFilter={usernameFilter}
          events={categories}
          dataHolder={dataHolder}
          eventHolder={eventHolder}
          checkedKeys={checkedKeys}
          loading={loading}
        />
      )}
    </div>
  );
}

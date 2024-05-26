import { useState, useEffect, lazy, Suspense } from "react";
import { message, Spin } from "antd";
import "./styles.css";
import { dataSource, mapping } from "../utils";

import BetsTable from "./BetsTable";
import Topbar from "./Topbar";
const Dashboard = lazy(() => import("./dashboards/Dashboard"));

export default function App() {
  const [categories, setCategories] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");
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
    initUserBets(dataHolder, userIdFilter);
  }, [userIdFilter, dataHolder]);

  const handleRowClick = (value) => {
    setUserIdFilter(value);
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
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Topbar
        events={categories}
        setEvents={setCategories}
        setUsernameFilter={showDash ? setUserIdFilter : setUsernameFilter}
        usernameFilter={showDash ? userIdFilter : usernameFilter}
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        expandedKeys={expandedKeys}
        setExpandedKeys={setExpandedKeys}
        treeData={treeData}
        loading={loading}
        refreshData={refreshData}
        showDash={showDash}
        handleSwitchClick={setShowDash}
      />
      {showDash && (
        <Suspense fallback={<Spin size="large" />}>
          <Dashboard totalUserBets={totalUserBets} />
        </Suspense>
      )}
      <BetsTable
        hide={showDash}
        handleRowClick={handleRowClick}
        usernameFilter={usernameFilter}
        events={categories}
        dataHolder={dataHolder}
        eventHolder={eventHolder}
        checkedKeys={checkedKeys}
        loading={loading}
      />
    </div>
  );
}

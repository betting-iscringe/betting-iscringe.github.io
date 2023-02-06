import { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import "./styles.css";

import BetsTable from "./BetsTable";
import Topbar from "./Topbar";

const headerAndParams = {
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
  params: { timestamp: new Date().getTime() },
};

const defaultPath = `https://betting-iscringe.github.io`;

export default function App() {
  const [events, setEvents] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [dataHolder, setDataHolder] = useState({});
  const [eventHolder, setEventHolder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(async () => {
    const { data: { defaults }} = await axios.get(`${defaultPath}/data`)
    setEvents(defaults)
  }, [])

  useEffect(() => {
    if (events.length > 0) getData(events);
  }, [events]);

  const refreshData = async () => {
    try {
      await getData(events, false);
      message.success("Refresh successful", 0.5);
    } catch {}
  };

  const getData = async (events, resetVisible = true) => {
    setLoading(true);
    let usedEvents = [];
    let keysHolder = [];
    let treeDataHolder = [];
    let totalData = {};
    for (let path of events) {
      try {
        const { data } = await axios.get(
          `${defaultPath}/data/${path}`,
          headerAndParams
        );

        const eventDataArray = await Promise.all(
          data.names.map(async (eventName) => {
            const { data: eventSingleData } = await axios.get(
              `${defaultPath}/data/${path}/${eventName}.json`,
              headerAndParams
            );
            return eventSingleData;
          })
        );
        const eventData = {};
        eventDataArray.forEach(
          (datum, i) => (eventData[data.names[i]] = datum)
        );

        usedEvents.push(...data.names);
        totalData = { ...totalData, ...eventData };
        treeDataHolder.push(
          ...Object.entries(eventData).map(([bettingEvent, poolObject]) => {
            let keyEvent = "EVENT_" + bettingEvent;
            keysHolder.push(keyEvent);
            return {
              title: bettingEvent,
              key: keyEvent,
              children: Object.entries(poolObject).map(([poolId, poolData]) => {
                keysHolder.push(poolId);
                return {
                  title: poolData.topic,
                  key: poolId,
                };
              }),
            };
          })
        );
      } catch (err) {
        message.error(path + " retrieval failed", 1);
        throw err;
      }
    }
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
        events={events}
        setEvents={setEvents}
        setUsernameFilter={setUsernameFilter}
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        expandedKeys={expandedKeys}
        setExpandedKeys={setExpandedKeys}
        treeData={treeData}
        loading={loading}
        refreshData={refreshData}
      />
      <BetsTable
        usernameFilter={usernameFilter}
        events={events}
        dataHolder={dataHolder}
        eventHolder={eventHolder}
        checkedKeys={checkedKeys}
        loading={loading}
      />
    </div>
  );
}

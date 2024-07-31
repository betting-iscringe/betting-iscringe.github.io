import axios from "axios";
import { message } from "antd";

export const headerAndParams = {
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
  params: { timestamp: new Date().getTime() },
};

const defaultPath = import.meta.env.VITE_API_URL;
const dataSource = axios.create({
  baseURL: defaultPath,
  transitional: {
    silentJSONParsing: false,
  },
});

const getDefault = async () => {
  const {
    data: { defaults },
  } = await dataSource.get(`/data`, headerAndParams);
  return defaults.map((i) => i.toLowerCase());
};

const getCategory = async (category) => {
  const { data } = await dataSource.get(`/data/${category}`, headerAndParams);
  return data;
};

const getEvent = async (category, event) => {
  const { data: eventSingleData } = await dataSource.get(
    `/data/${category}/${event}.json`,
    headerAndParams
  );
  return eventSingleData;
};

const getAllEvents = async (categories) => {
  let usedEvents = [];
  let keysHolder = [];
  let treeDataHolder = [];
  let totalData = {};
  for (let category of categories) {
    try {
      const data = await getCategory(category);

      const eventDataArray = await Promise.all(
        data.names.map(async (eventName) => getEvent(category, eventName))
      );
      const eventData = {};
      eventDataArray.forEach((datum, i) => (eventData[data.names[i]] = datum));

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
                isLeaf: true,
              };
            }),
          };
        })
      );
    } catch (err) {
      message.error(category + " retrieval failed", 1);
      throw err;
    }
  }

  return { totalData, usedEvents, treeDataHolder, keysHolder };
};

export default {
  getDefault,
  getCategory,
  getEvent,
  getAllEvents,
};

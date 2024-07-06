import dataSource, { headerAndParams } from "./datasource";
import mapping from "./mapping";
import commaMaker from "./commaMaker";

const COLORS = {
  RED: "#FF2B2B",
  GREEN: "#2BFF2B",
  BG: "#16161A",
  DARK_RED: "#cf1322",
  DARK_GREEN: "#3f8600",
};

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

export {
  dataSource,
  headerAndParams,
  mapping,
  commaMaker,
  COLORS,
  compareArrays,
};

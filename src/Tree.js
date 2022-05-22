import { useEffect } from "react";
import { Tree } from "antd";

export default (props) => {
  const {
    checkedKeys,
    setCheckedKeys,
    data,
    treeData,
    expandedKeys,
    setExpandedKeys,
  } = props;

  useEffect(() => {}, [data]);
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <div className="ant-menu" style={{ maxHeight: "90vh", overflow: "auto" }}>
      <Tree
        checkable
        autoExpandParent
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
        style={{
          margin: 8,
          fontSize: 16,
        }}
      />
    </div>
  );
};

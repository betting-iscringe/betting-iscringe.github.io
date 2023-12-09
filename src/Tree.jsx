import { Tree } from "antd";
const { DirectoryTree } = Tree;

export default (props) => {
  const {
    checkedKeys,
    setCheckedKeys,
    treeData,
    expandedKeys,
    setExpandedKeys,
  } = props;

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue.filter((key) => !key.startsWith("EVENT_")));
  };
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(
      expandedKeysValue.filter((key) => key.startsWith("EVENT_"))
    );
  };

  return (
    <div className="ant-menu" style={{ maxHeight: "90vh", overflow: "auto" }}>
      <DirectoryTree
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
        expandAction="click"
      />
    </div>
  );
};

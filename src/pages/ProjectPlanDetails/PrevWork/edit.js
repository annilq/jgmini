import React, { useState, useEffect } from 'react';
import { Tree, Button, Input, InputNumber, Select } from 'antd';
import { layerBoxStyle, layerContentStyle, layerFooterStyle } from '@/common/styles/layer';


const { Search } = Input;
const { Option } = Select;

function Edit(props) {

  const { value = [], rowId, list, onSubmit, onClose } = props;
  const initkey = value.map(item => item.preWorkId);
  const [expandedKeys, setExpandedKeys] = useState(initkey);
  const [checkedKeys, setCheckedKeys] = useState({ checked: initkey });
  const [prevWorks, setPrevWorks] = useState([...value]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    // console.log('onExpand', expandedKeys); 
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (newcheckedKeys) => {
    console.log('onCheck', newcheckedKeys);
    setCheckedKeys(newcheckedKeys);
  };

  function updatePreWorkData(key, data) {
    const prevWorkIndex = prevWorks.findIndex(item => item.preWorkId === key);
    if (prevWorkIndex > -1) {
      prevWorks.splice(prevWorkIndex, 1, { ...prevWorks[prevWorkIndex], ...data });
    } else {
      prevWorks.push(data);
    }
    setPrevWorks([...prevWorks]);
  }

  function titleRender(nodedata) {
    const { title, key } = nodedata;
    const checkedKey = checkedKeys.checked && checkedKeys.checked.find(item => item === key);
    const [prevwork = {}] = prevWorks
    return (
      <>
        <div>{title}</div>
        {checkedKey && <PrevWorkConfig data={nodedata} onChange={(data) => updatePreWorkData(key, data)} {...key === prevwork.preWorkId && { prevwork }} />}
      </>
    )
  }

  function handleSubmit() {
    const preWorkData = checkedKeys.checked.map(key => prevWorks.find(work => work.preWorkId === key));
    onSubmit(preWorkData);
  };

  const treeData = React.useMemo(() => {
    function loopData(listData) {
      return listData.map(({ subRows, id: curRowId, original: { workName, id } }) => {
        // 子任务或者任务本身则不能选择
        const disabled = (curRowId.indexOf(rowId) === 0) || (rowId.indexOf(curRowId) === 0) || (checkedKeys.checked.indexOf(id) < 0 && checkedKeys.checked.length > 0);
        return ({ title: workName, key: id, children: loopData(subRows), disabled, rowId: curRowId })
      })
    }
    const newData = loopData(list);
    return newData
  }, [list, rowId, checkedKeys])

  return (
    <div style={{ ...layerBoxStyle, backgroundColor: "#fff" }}>
      <div style={layerContentStyle}>
        {/* <Search style={{ marginBottom: 8 }} placeholder="搜搜" onChange={onChange} /> */}
        <Tree
          checkable
          selectable={false}
          checkStrictly
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
          titleRender={titleRender}
        />
        <div style={layerFooterStyle}>
          <Button onClick={onClose} style={{ marginRight: '16px', padding: '0 20px',  }}>
            取消
          </Button>
          <Button type="primary" onClick={handleSubmit} style={{ padding: '0 20px',  }}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}


function PrevWorkConfig(props) {
  const { onChange, data, prevwork = {} } = props;
  const { key, title, rowId, prevType = "FS", prevInterval = 0 } = data;
  function handleChange(key, value) {
    onChange({ [key]: value })
  }

  const initState = {
    preWorkId: key,
    preWorkName: title,
    prevType: prevwork.prevType || prevType,
    prevInterval: prevwork.prevInterval || prevInterval,
    rowId
  }
  useEffect(() => {
    onChange(initState)
  }, []);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div style={{ display: "flex" }}>
        <div style={{ width: 60 }}>
          类型
        </div>
        <Select value={initState.prevType} style={{ width: 160, marginLeft: 6 }} onChange={(value) => handleChange("prevType", value)}>
          <Option value="FS">完成-开始(FS)</Option>
          <Option value="SS">开始-开始(SS)</Option>
          <Option value="FF">完成-完成(FF)</Option>
          <Option value="SF">开始-完成(SF)</Option>
        </Select>
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <div style={{ width: 60 }}>  间隔时间 </div>
        <InputNumber min={0} value={initState.prevInterval} style={{ width: 160, marginLeft: 6 }} onChange={(value) => handleChange("prevInterval", value || 0)} />
      </div>
    </div>
  )
}

export default Edit;

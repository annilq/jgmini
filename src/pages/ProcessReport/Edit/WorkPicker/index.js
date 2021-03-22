import React, { useMemo, useState } from 'react'
import { Input, Radio, List, Button } from 'antd'
import { TreePicker } from "@/components/CustomForm"
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';

const { Search } = Input

const options = [
  { label: '未完成', value: 0 },
  { label: '已完成', value: 1 }
];

function WorkPicker(props) {
  const { value, workList, onSelect } = props;

  const [visible, setVisible] = useLayerVisible(false);
  const [workValue, setWorkValue] = useState(value);
  const [worktypeValue, setWorkType] = useState(0);

  function showModal() {
    setVisible(true);
  };

  function handleOk(data) {
    const work = workList.find(item => item.id === workValue);
    onSelect(work)
    setVisible(false);
  };

  function handleCancel(e) {
    setVisible(false);
  };

  // function searchHandle(data) {
  //   console.log(data);
  // }

  function switchType(e) {
    setWorkType(e.target.value)
  }

  function onChangehandle(value) {
    setWorkValue(value)
  }

  const work = useMemo(() => {
    return workList.find(item => item.id === value);
  }, [value]);

  const listHeight = {
    "height": 'calc(100vh - 56px)',
    "overflowY": 'scroll',
  };

  return (
    <>
      <Input readOnly onClick={() => showModal()} value={work && work.workName} />
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
        onOk={handleOk}
        bodyStyle={{ padding: 0 }}
      >
        {/* <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={searchHandle} /> */}
        {/* <Radio.Group
          options={options}
          onChange={switchType}
          value={worktypeValue}
          optionType="button"
          buttonStyle="solid"
        /> */}
        <div style={listHeight}>
          <Radio.Group
            onChange={(e) => onChangehandle(e.target.value)}
            value={workValue}
            style={{ width: "100%" }}
          >
            <List
              itemLayout="horizontal"
              dataSource={workList}
              renderItem={item => (
                <List.Item>
                  <label style={{ width: "100%", display: "flex", padding: "0 12px" }}>
                    <div style={{ color: "#939BA4", flex: 1, lineHeight: "25px" }}>
                      <div style={{ color: "#000" }}> {item.workName}</div>
                      <div> 计划起止时间: {item.startDate}~{item.endDate}</div>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>工作量单位:
                         {item.unit === "%" ? item.unit : (
                            <TreePicker
                              extraProps={{
                                url: "/api/v1/system/unit/getAllUnit",
                                parentNodeDisable: true,
                              }}
                              placeholder="单位"
                              value={item.unit}
                              readOnly
                              style={{ width: 140 }}
                            />)}
                        </div>
                        <div style={{ flex: 1 }}>总量: {item.workload}
                        </div>
                        <div style={{ flex: 1 }}>剩余工作量: {item.workload - item.finishWorkload}
                        </div>
                      </div>
                    </div>
                    <Radio value={item.id} style={{ alignSelf: "center" }} />
                  </label>
                </List.Item>
              )}
            />
          </Radio.Group>
          <div className="actionBtns">
            <Button
              onClick={handleOk}
              type="primary"
            >确定
            </Button>
            <Button
              onClick={handleCancel}
            >取消
            </Button>
          </div>
        </div>
      </Layer>
    </>
  )
}

export default WorkPicker;

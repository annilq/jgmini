import React, { useMemo, useState } from 'react';
import { Input, Radio, List, Button } from 'antd';
import { TreePicker } from '@/components/CustomForm';
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';


const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
function MaterialPicker(props) {
  const { value, detailList, onSelect } = props;

  const [visible, setVisible] = useLayerVisible(false);
  const [materialValue, setMaterialValue] = useState(value);

  function showModal() {
    setVisible(true);
  }

  function handleOk(data) {
    const material = detailList.find(item => item.id === materialValue);
    onSelect(material);
    setVisible(false);
  }

  function handleCancel(e) {
    setVisible(false);
  }

  function onChangehandle(value) {
    setMaterialValue(value);
  }

  const material = useMemo(
    () => {
      return detailList.find(item => item.id === value);
    },
    [value]
  );

  const listHeight = {
    "height": 'calc(100vh - 56px)',
    "overflowY": 'scroll',
  };

  return (
    <>
      <Input readOnly onClick={() => showModal()} value={material && material.materialName} />
      <Layer
        type="drawer"
        visible={visible}
        width="100%"
        footer={null}
      >
        <div style={listHeight}>
          <Radio.Group
            onChange={e => onChangehandle(e.target.value)}
            value={materialValue}
            style={{ width: '100%' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={detailList}
              renderItem={item => (
                <List.Item>
                  <label
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#000' }}> {item.materialName}</div>
                      <div style={{ color: '#939BA4' }}>
                        <div>
                          剩余数量 {item.planNum - item.useNum}
                          <TreePicker
                            extraProps={{
                              url: '/api/v1/system/unit/getAllUnit',
                              parentNodeDisable: true,
                            }}
                            placeholder="单位"
                            value={item.unit}
                            readOnly
                            style={{ width: 140 }}
                          />
                        </div>
                      </div>
                    </div>
                    <Radio value={item.id} style={radioStyle} />
                  </label>
                </List.Item>
              )}
            />
          </Radio.Group>
          <div className="actionBtns">
            <Button onClick={handleOk} type="primary">
              确定
            </Button>
            <Button onClick={handleCancel}>取消</Button>
          </div>
        </div>
      </Layer>
    </>
  );
}

export default MaterialPicker;

import React, { forwardRef } from 'react';
import { Select, Form, Col, Button } from 'antd';

import { DataPicker, DataSelecter } from '@/components/CustomForm';
const FormItem = Form.Item;

const { Option } = Select;
// 这里的ref可能是整个formItem的ref，我们实际上是一个list，可能后面会有问题，目前只是消除提示错误
function RelationList({ value, onChange, config }, ref) {
  const newValue = (value && JSON.parse(value)) || [];
  // console.log(newValue);

  // 新增
  function addNewItem() {
    console.log(newValue);
    newValue.push({ relationId: '', relationModule: '', recordNo: '' });
    onChange(JSON.stringify(newValue));
  }
  // 修改
  function onItemChange(data, index) {
    newValue.splice(index, 1, data);
    onChange(JSON.stringify(newValue));
  }
  // 删除
  function onItemRemove(index) {
    newValue.splice(index, 1);
    onChange(JSON.stringify(newValue));
  }

  const list = newValue.map((item, index) => (
    <RelationItem
      key={index}
      value={item}
      onChange={data => onItemChange(data, index)}
      remove={() => onItemRemove(index)}
      config={config}
    />
  ));
  return (
    <div ref={ref}>
      <Button type="primary" onClick={addNewItem}>
        添加
      </Button>
      <div className="list">{list}</div>
    </div>
  );
}

function RelationItem({ onChange, value, config, remove }) {
  const { relationId, relationModule } = value;

  function onRelationIdChange(data) {
    onChange({ ...value, recordNo: data.recordNo, relationId: data.id });
  }
  // 模块变了都清除
  function onModuleChange(id) {
    onChange({ recordNo: '', relationId: '', relationModule: id });
  }

  return (
    <DataSelecter extraProps={config}>
      {candidates => {
        const selectObj = candidates.find(item => item.value === relationModule);
        // console.log(value);
        // console.log(selectObj, relationModule);
        return (
          <div>
            <Col md={11} sm={24}>
              <FormItem label="">
                <Select
                  placeholder="请选择关联模块"
                  allowClear
                  onChange={onModuleChange}
                  value={relationModule}
                >
                  {candidates.map(item => (
                    <Option key={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            {selectObj && (
              <Col md={11} sm={24}>
                <FormItem label={selectObj.itemText}>
                  <DataPicker
                    extraProps={{
                      formCode: selectObj.description,
                      nameCodeKey: 'recordNo',
                      nameCode: 'recordNo',
                      formType:  "system"
                    }}
                    formdata={value}
                    value={relationId}
                    placeholder={selectObj.itemText}
                    key={selectObj.description}
                    id="relationId"
                    onSelect={onRelationIdChange}
                  />
                </FormItem>
              </Col>
            )}
            <Col md={2} sm={24} style={{ textAlign: 'right' }}>
              <FormItem>
                <Button type="danger" ghost onClick={remove}>
                  删除
                </Button>
              </FormItem>
            </Col>
          </div>
        );
      }}
    </DataSelecter>
  );
}

export default forwardRef(RelationList);

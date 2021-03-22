import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, List, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SectionHeader from '@/components/SectionHeader';
import Layer from '@/components/Layer';

import PlanForm from './planform';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import LayerHeader from '@/components/LayerHeader';
import styles from '@/components/CustomForm/index.less';

import useLayerVisible from '@/hooks/useLayer';

function PlanList(props) {
  const { projectId, detailList, value = [], onChange, dispatch } = props;
  const [visible, setVisible] = useLayerVisible(false);
  const [data, setData] = useState({});
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(
    () => {
      if (projectId) {
        dispatch({
          type: 'projectMaterialReport/getDetailListByProjectId',
          payload: { id: projectId },
        });
        onChange([]);
      }
    },
    [projectId]
  );

  const onSubmit = formdata => {
    if (!data.materialId) {
      value.push(formdata);
      onChange([...value]);
    } else {
      const newState = value.map(item => {
        if (item.materialId === formdata.id) {
          return { ...item, ...formdata };
        }
        return item;
      });
      onChange(newState);
    }
    setVisible(false);
  };

  const showItem = () => {
    if (!projectId) {
      notification.warn({ message: '请先选择项目' });
      return;
    }
    setVisible(true);
    setData({});
    setEditIndex(-1);
  };

  const removeItem = index => {
    value.splice(index, 1);
    onChange([...value]);
    setVisible(false);
  };

  const editItem = index => {
    setData(value[index]);
    setVisible(true);
    setEditIndex(index);
  };

  const columns = [
    {
      title: '编码',
      dataIndex: 'recordNo',
    },
    {
      title: '物料或设备名称',
      dataIndex: 'materialName',
    },
    {
      title: '规格型号',
      dataIndex: 'specs',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '总量',
      dataIndex: 'planNum',
    },
    {
      title: '单价（元）',
      dataIndex: 'price',
    },
    {
      title: '本次提交量',
      dataIndex: 'submitAmount',
    },
    {
      title: '已使用量',
      dataIndex: 'useNum',
    },
    {
      title: '完成率',
      dataIndex: 'finishRate',
      render: (text, record, index) => {
        return text ? `${Number(text).toFixed(2) * 100}%` : '0%';
      },
    },
  ];
  return (
    <>
      <SectionHeader title="填报明细" style={{ margin: '8px' }} />
      <List
        renderItem={(item, index) => (
          <List.Item>
            <SubTableItemCell
              data={item}
              columns={columns}
              onEdit={() => editItem(index)}
              showIndicator
            />
          </List.Item>
        )}
        locale={{ emptyText: '暂无数据' }}
        dataSource={value}
        split={false}
      />
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
        footer={null}
      >
        <div className={styles.baseForm}>
          <PlanForm
            onSubmit={onSubmit}
            detailList={detailList}
            data={data}
            editIndex={editIndex}
            remove={removeItem}
          />
        </div>
      </Layer>
      <Button type="primary" ghost className="addNewBtn" onClick={showItem} icon={<PlusOutlined />}>
        新增
      </Button>
    </>
  );
}

export default connect(({ projectMaterialReport, loading }) => ({
  detailList: projectMaterialReport.detailList,
  submitloading: loading.effects['projectMaterialReport/getDetailListByProjectId'] || false,
}))(PlanList);

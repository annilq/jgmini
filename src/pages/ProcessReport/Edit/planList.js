import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Button, List, notification } from 'antd'
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import SectionHeader from '@/components/SectionHeader';
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import { TreePicker } from '@/components/CustomForm';

import styles from '@/components/CustomForm/index.less';
import PlanForm from "./planform"

function PlanList(props) {
  const { projectId, workList, value = [], onChange, dispatch } = props;
  const [visible, setVisible] = useLayerVisible(false);
  const [data, setData] = useState({});
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (projectId) {
      dispatch({
        type: 'projectProcessReport/getWorksByProjectId',
        payload: { id: projectId },
      });
      onChange([])
    }
  }, [projectId])

  const onSubmit = (formdata) => {
    if (!data.workId) {
      value.push(formdata);
      onChange([...value]);

    } else {
      const newState = value.map(item => {
        if (item.workId === formdata.id) {
          return { ...item, ...formdata };
        }
        return item
      })
      onChange(newState);
    }
    setVisible(false);
  }

  const addItem = () => {
    if (!projectId) {
      notification.warn({ message: "请先选择项目" })
      return
    }
    setData({});
    setVisible(true);
    setEditIndex(-1);
  }

  const removeItem = (index) => {
    value.splice(index, 1)
    onChange([...value]);
    setVisible(false);
  }

  const editItem = (index) => {
    setData(value[index]);
    setVisible(true);
    setEditIndex(index);
  }

  const columns = [
    {
      title: '工作名称',
      dataIndex: 'workName',
    },
    {
      title: '计划起止时间',
      dataIndex: 'planDate',
    },
    {
      title: '实际起止时间',
      dataIndex: 'actualEndDate',
      render: (text, record) => {
        return <>{record.actualStartDate}~{record.actualEndDate}</>
      }
    },
    {
      title: '剩余工作量',
      dataIndex: 'leftload',
    },
    {
      title: '工作量单位',
      dataIndex: 'unit',
      render: (text) => {
        return text === "%" ?
          text :
          (<TreePicker
            extraProps={{
              url: "/api/v1/system/unit/getAllUnit",
              parentNodeDisable: true,
            }}
            placeholder="单位"
            value={text}
            readOnly
            style={{ width: 140 }}
          />)
      }
    },
    {
      title: '本次上报工作量',
      dataIndex: 'submitAmount',
    },
    {
      title: '累计完成量',
      dataIndex: 'allfinish',
    },
    {
      title: '完成度',
      dataIndex: 'finishRate',
      render: (text, record, index) => {
        return text ? `${Number(text).toFixed(2) * 100}%` : "0%"
      }
    },
    // {
    //   title: '现场进展',
    //   dataIndex: 'perc',
    // },
    {
      title: '是否完成',
      dataIndex: 'isOver',
      render: (text, record, index) => {
        return text ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#f5222d" }} />
      }
    }
  ];
  return (
    <>
      <SectionHeader title="填报明细" />
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
        visible={visible}
        width="100%"
      >
        <div className={styles.baseForm}>
          <PlanForm onSubmit={onSubmit} workList={workList} data={data} editIndex={editIndex} remove={removeItem} />
        </div>
      </Layer>
      <Button
        type="primary"
        ghost
        className="addNewBtn"
        onClick={addItem}
        icon={<PlusOutlined />}
      >
        新增
      </Button>
    </>
  )
}

export default connect(({ projectProcessReport, loading }) => ({
  workList: projectProcessReport.workList,
  submitloading:
    loading.effects['projectProcessReport/getWorksByProjectId'] ||
    false,
}))(PlanList);

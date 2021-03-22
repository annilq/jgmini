import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ProgressRing from '@/components/ProgressRing';
import { TreePicker, ImagePreview } from "@/components/CustomForm"
import SubTableItemCell from '@/components/TableItem/SubTableItem';

import styles from "@/common/styles/projectplan.less"

function Main(props) {
  const { match: { params: { id }, }, data, dispatch } = props;
  const { recordStatus, finishRate, remark, title, projectName, endDate, createTime, creatorName, startDate, picId, details = [] } = data;
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record, index) => {
        return `${index + 1}`
      }
    }, {
      title: '工作名称',
      dataIndex: 'workName',
    },
    {
      title: '计划起止时间',
      dataIndex: 'startDate',
      render: (text, record) => {
        return `${record.startDate}~${record.endDate}`
      }
    },
    {
      title: '实际起止时间',
      dataIndex: 'actualEndDate',
      render: (text, record) => {
        return <>{record.actualStartDate}~{record.actualEndDate}</>
      }
    },
    {
      title: '计划工作量',
      dataIndex: 'workload',
      render: (text, record, index) => {
        return (
          <>
            {text} <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              placeholder="单位"
              value={record.unit}
              readOnly
              style={{ width: 140 }}
            />
          </>
        )
      }
    },
    {
      title: '本次上报工作量',
      dataIndex: 'submitAmount',
      render: (text, record, index) => {
        return (
          <>
            {text} <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              placeholder="单位"
              value={record.unit}
              readOnly
              style={{ width: 140 }}
            />
          </>
        )
      }
    },
    {
      title: '累计完成工作量',
      dataIndex: 'finishWorkload',
      render: (text, record, index) => {
        return (
          <>
            {text}
            {record.unit === "%" ? "%" : (
              <TreePicker
                extraProps={{
                  url: "/api/v1/system/unit/getAllUnit",
                  parentNodeDisable: true,
                }}
                placeholder="单位"
                value={record.unit}
                readOnly
                style={{ width: 140 }}
              />)}
          </>
        )
      }
    },
    {
      title: '完成度',
      dataIndex: 'finishRate',
      render: (text, record, index) => {
        return <>{typeof text === "number" ? text.toFixed(2) * 100 : 0}%</>
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

  function queryRemote() {
    dispatch({ type: 'projectProcessReport/queryRemote', payload: { id } });
  }

  useEffect(() => {
    if (id) {
      queryRemote();
    }
  }, [id]);

  return (
    <>
      <div className={styles.planInfo}>
        <div style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row"
        }}
        >
          <div className={styles.progress}>
            <ProgressRing value={finishRate || 0} status={recordStatus} />
          </div>
          <div className={styles.content}>
            <div className={styles.title} style={{ marginLeft: 0 }}>
              {title}
            </div>
            <div>
              所属项目:{projectName}
            </div>
            <div>
              <div>
                填报人:{creatorName}
              </div>
              <div>
                填报周期：{startDate}至{endDate}
              </div>
              <div>
                填报日期：{createTime}
              </div>
            </div>
          </div>

        </div>
        <div className={styles.content}>
          {(picId && (
            <>
              <div className={styles.subtitle}>
                附件
              </div>
              <div>
                <ImagePreview value={picId} />
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles.planInfo} style={{ marginTop: 10 }}>
        <div style={{ marginTop: 10 }}>
          <List
            renderItem={(item, index) => (
              <List.Item>
                <SubTableItemCell
                  data={item}
                  columns={columns}
                  index={index}
                  // {...onItemClick && { onItemClick: () => onItemClick(index) }}
                  showIndicator
                />
              </List.Item>
            )}
            locale={{ emptyText: '暂无数据' }}
            dataSource={details}
            split={false}
          />
        </div>
        {remark && (
          <div className={styles.content}>
            <div style={{ marginTop: 10 }}>
              填报说明:<div style={{ color: "#000" }}>{remark}</div>
            </div>
          </div>)
        }
      </div>
    </>
  );
}

export default connect(({ projectProcessReport }) => ({
  data: projectProcessReport.item
}))(Main);

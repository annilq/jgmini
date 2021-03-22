import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TableWithPagination from '@/components/TableWithPagination';
import SectionHeader from '@/components/SectionHeader';
import FormItemData from '@/components/CustomForm/FormItem/detail';

import CheckStatusButton from '@/components/StatusButton/CheckStatusButton';

function TableList(props) {
  const {
    item,
    data,
    dispatch,
    params = {}
  } = props;
  const { id, content, parentId, createTime, creatorName, standardContent, projectName, isRegularCheck, inspectorName} = item;
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => <span>{index + 1}</span>,
    }, {
      title: '单据编号',
      dataIndex: 'recordNum',
    },
    {
      title: '检查人',
      dataIndex: 'inspectorName',
    },
    {
      title: '检查时间',
      dataIndex: 'date',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    // {
    //   title: '是否逾期检查',
    //   dataIndex: 'price',
    // },
    {
      title: '检查结果',
      dataIndex: 'status',
      render: (text) => {
        return <CheckStatusButton data={text} />;
      },
    },
  ];

  function onPageRemote(data = {}) {
    dispatch({ type: 'qualitySetting/listRecordRemote', payload: { ...data, ...params, inspectionItemId: id } });
  }

  useEffect(() => {
    if (id) {
      onPageRemote()
    }
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px 20px" }}>
        <SectionHeader title="基本信息" />
        <div className="form-container-content">
          <div
            className="form-info-item"
          >
            <div className="form-info-label">检查项 </div>
            <div className="form-info-value">{content}</div>
          </div>
          {/* <div
            className="form-info-item"
          >
            <div className="form-info-label">父级 </div>
            <div className="form-info-value">测试同步数据任务</div>
          </div> */}
          <div
            className="form-info-item"
          >
            <div className="form-info-label">项目名称 </div>
            <div className="form-info-value">{projectName}</div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">检查验收标准 </div>
            <div className="form-info-value">{standardContent}</div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">检查状态 </div>
            <div className="form-info-value">
              <FormItemData
                data={{
                  controlCode: "state",
                  controlType: 6,
                  extraProps: {
                    flag: "inspectItemStatusMap",
                    type: 2,
                  }
                }}
                formdata={item}
              />
            </div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">是否定期检查 </div>
            <div className="form-info-value">{isRegularCheck ? "是" : "否"}</div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">检查周期 </div>
            <div className="form-info-value">
              <FormItemData
                data={{
                  controlCode: "checkCycle",
                  controlType: 6,
                  extraProps: {
                    flag: "inspectItemCycleMap",
                    type: 2,
                  }
                }}
                formdata={item}
              />
            </div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">检查负责人 </div>
            <div className="form-info-value">{inspectorName}</div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">创建人 </div>
            <div className="form-info-value">{creatorName}</div>
          </div>
          <div
            className="form-info-item"
          >
            <div className="form-info-label">创建时间 </div>
            <div className="form-info-value">{createTime}</div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#fff", padding: "0 20px" }}>
        <SectionHeader title="检查记录" />
        <TableWithPagination data={data} columns={columns} rowKey="id" onPaginationChange={onPageRemote} />
      </div>
    </div>
  );
}


export default connect(({ qualitySetting }) => ({
  data: qualitySetting.recordlistdata,
}))(TableList);

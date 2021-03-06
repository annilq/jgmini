import React, { useEffect } from 'react';
import { Menu, Dropdown, Button, notification } from 'antd';
import { connect } from 'react-redux';
import router from 'umi/router';
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons';

import IconFont from '@/components/IconFont';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExpandButton from "@/components/ExpandButton"
import { TreePicker } from "@/components/CustomForm"

import { projectProcessWork as api } from '@/services/api';
import CustomUpload from '@/components/CustomUpload';

import PrevWork from "./PrevWork"
import EditableCell from "./EditableCell"

import Plans from "./planList"
import styles from "./index.less"

function Main(props) {
  const {
    match: {
      params: { id },
    },
    projectPlan: { editlist },
    dispatch
  } = props;
  const [formData, setFormData] = React.useState([]);

  function getList() {
    dispatch({ type: 'projectPlan/editListRemote', payload: { id } });
  }

  useEffect(() => {
    if (id) {
      getList()
    }
  }, [id]);

  useEffect(() => {
    setFormData(editlist);
  }, [editlist]);


  function updateRowData(id, state) {
    function mergeData(data) {
      return data.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            ...state,
          }
        }
        return {
          ...row,
          children: mergeData(row.children)
        }
      })
    }
    // We also turn on the flag to not reset the page
    setFormData(old => {
      const newdata = mergeData(old);
      return newdata
    })
  }


  function deleteRowData(id, list) {
    for (let index = 0; index < list.length; index += 1) {
      const element = list[index];
      if (element.id === id) {
        list.splice(index, 1);
        return list
      }
      if (element.children && element.children.length > 0) {
        element.children = deleteRowData(id, element.children)
      }
    }

    return list
  }

  function addTtemToList(data, parentId) {
    if (parentId) {
      for (let index = 0; index < formData.length; index += 1) {
        const element = formData[index];
        if (element.id === parentId) {
          element.children.push(data);
          return formData
        }
      }
    }

    formData.push(data)
    return formData
  }


  function addPlan() {
    dispatch({
      type: 'projectPlan/addOneRemote',
      payload: { processId: id },
      callback: (response) => {
        const newList = addTtemToList({ id: response.resp, processId: id, children: [] })
        setFormData([...newList]);
      }
    });
  }

  function saveAllPlan(data) {
    dispatch({
      type: 'projectPlan/addAllRemote', payload: { processId: id, workList: data }, callback: (response) => {
        notification.success({
          duration: 2,
          message: response.info,
        });
        router.goBack();
      }
    });
  }

  const deleteWork = (id) => {
    dispatch({
      type: 'projectPlan/removeRemote',
      payload: { id },
      callback: (response) => {
        const newEditlist = deleteRowData(id, formData);
        setFormData([...newEditlist])
      }
    });
  }

  function addSubWork(workId) {
    dispatch({
      type: 'projectPlan/addOneRemote',
      payload: { processId: id, parentId: workId },
      callback: (response) => {
        const newList = addTtemToList({ id: response.resp, processId: id, parentId: workId, children: [] }, workId)
        setFormData([...newList]);
      }
    });
  }

  const columns = [
    {
      // Build our expander column
      id: 'expander', // Make sure it has an ID
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? <ExpandButton expanded={false} /> : <ExpandButton expanded />}
        </span>
      ),
      Cell: (cellProps) => {
        const { row } = cellProps
        // console.log(row);
        return (
          <span style={{ paddingLeft: `${row.depth * 1}rem` }}>
            {row.canExpand && (
              <span
                {...row.getToggleRowExpandedProps()}
              >
                {row.isExpanded ? <ExpandButton expanded={false} /> : <ExpandButton expanded />}
              </span>
            )}
            {row.id.split(".").map(item => parseInt(item, 10) + 1).join(".")}
          </span>)
      }
    },
    {
      Header: '??????????????????',
      accessor: 'isMilestone',
      Cell: ({ row }) => {
        const { original, state, setState } = row;
        const newState = { ...original, ...state };
        const { isMilestone } = newState;
        function onChange(data) {
          setState({ ...state, isMilestone: data });
          updateRowData(original.id, { ...state, isMilestone: data })
        }

        return <div onClick={() => onChange(!isMilestone)}>{isMilestone ? <StarFilled style={{ color: "#f6be1c" }} /> : <StarOutlined />}</div>
      }
    },
    {
      Header: '????????????',
      accessor: 'workName',
      Cell: (cellProps) => {
        // console.log(cellProps);
        return <EditableCell {...cellProps} />
      }
    },
    {
      Header: '????????????',
      accessor: 'prevWork',
      Cell: (cellProps) => {
        // console.log(cellProps);
        const { row: { subRows = [] } } = cellProps;
        // ???????????????????????????????????????
        if (subRows.length > 0) {
          return false
        }
        return <PrevWork {...cellProps} />
      }
    },
    {
      Header: '??????(???)',
      accessor: 'days',
      type: "number",
      Cell: (cellProps) => {
        // console.log(cellProps);
        // console.log(cellProps);
        const { row: { original, state, subRows = [] } } = cellProps;
        const newState = { ...original, ...state };
        const isParentPlan = subRows.length > 0;
        // ???????????????????????????????????????????????????(?????????????????????)
        if (isParentPlan) {
          return <>{newState.days}</>
        }
        return <EditableCell {...cellProps} />
      }
    },
    {
      Header: '????????????',
      accessor: 'startDate',
      type: "date",
      Cell: (cellProps) => {
        // console.log(cellProps);
        const { row: { subRows = [], state } } = cellProps;
        const isParentPlan = subRows.length > 0;
        // ???????????????????????????????????????????????????(?????????????????????)
        if (isParentPlan) {
          return <>{state.startDate}</>
        }
        return <EditableCell {...cellProps} />
      }
    },
    {
      Header: '????????????',
      accessor: 'endDate',
      Cell: (cellProps) => {
        // console.log(cellProps);
        const { row: { state, values } } = cellProps;
        return <>{state.endDate || values.endDate}</>
      }
    },
    {
      Header: '?????????(??????)',
      accessor: 'workload',
      type: "number",
      Cell: (cellProps) => {
        // console.log(cellProps);
        const { row: { subRows = [] } } = cellProps;
        const isParentPlan = subRows.length > 0;
        // ???????????????????????????????????????????????????(?????????????????????)
        if (isParentPlan) {
          return false
        }
        return <EditableCell {...cellProps} />
      }
    },
    {
      Header: '?????????(??????)',
      accessor: 'unit',
      Cell: (cellProps) => {
        // console.log(cellProps);
        const { row: { original, state, setState, subRows = [] } } = cellProps;
        function onChange(data) {
          setState({ ...state, unit: data });
          updateRowData(original.id, { ...state, unit: data })
        }
        const newState = { ...original, ...state };
        const isParentPlan = subRows.length > 0;
        // ???????????????????????????????????????????????????(?????????????????????)
        if (isParentPlan) {
          return false
        }
        return (
          <TreePicker
            extraProps={{
              url: "/api/v1/system/unit/getAllUnit",
              parentNodeDisable: true,
            }}
            placeholder="??????"
            value={newState.unit}
            onChange={onChange}
            style={{ width: 140 }}
          />
        )
      }
    },
    {
      Header: '??????',
      accessor: 'action',
      Cell: ({ row, value }) => {
        const menu = (
          <Menu>
            {!row.original.parentId && (
              <Menu.Item key="0">
                <a onClick={() => addSubWork(row.original.id)}>???????????????</a>
              </Menu.Item>
            )}
            {/* <Menu.Item key="1">
              <a onClick={() => updatePlanTime(row.original.id)}>????????????</a>
            </Menu.Item> */}
            <Menu.Item key="2">
              <a onClick={() => deleteWork(row.original.id)}>????????????</a>
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        )
      }
    },
  ];


  function onFinishUpload(data) {
    if (data.code === 0) {
      setFormData(formData.concat(data.resp));
      // console.log(data);
    }
  }

  return (
    <PageHeaderWrapper>
      <div style={{ padding: "10px", backgroundColor: "#fff" }}>
        <div className={styles.actionBtns}>
          <Button icon={<IconFont icon="tjzj" />} onClick={addPlan}>????????????</Button>
          {/* <Button icon={<IconFont icon="bjgz" />}>????????????</Button> */}
          <CustomUpload
            onFinishUpload={onFinishUpload}
            // templateUrl="/template/workproject.mpp"
            uploadUrl={api.fileImport}
          />
          {/* <Button icon={<IconFont icon="rwpf" />}>????????????</Button>
          <Button icon={<IconFont icon="sjpy" />}>????????????</Button>
          <Button icon={<IconFont icon="delework" />}>????????????</Button> */}
        </div>
        <div style={{ marginTop: 10 }}>
          <Plans
            columns={columns}
            data={formData}
            updateRowData={updateRowData}
            onSubmit={() => saveAllPlan(formData)}
          />
          {/* <Plans2
            data={editlist}
            columns={columns}
          /> */}
        </div>
      </div>
    </PageHeaderWrapper>
  );
}

export default connect(({ projectPlan, loading }) => ({
  projectPlan,
  tableLoading: loading.effects['projectPlan/listRemote'] || false,
  detailLoading: loading.effects['projectPlan/queryRemote'] || false,
}))(Main);

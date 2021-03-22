import React from 'react'
import { Input, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from "moment"
import Layer from '@/components/Layer';
import Edit from "./edit"

function PrevWork(props) {
  const { initialRows: list, updateRowData, row: { id, original, state: rowState, setState, values: rowValues }, rowsById } = props;
  const newState = { ...original, ...rowState };
  // console.log(props);
  const [visible, setVisible] = React.useState(false);
  const initState = newState.prevWork && JSON.parse(newState.prevWork) || []
  const [preworks, setPrevWork] = React.useState(initState);

  function showModal() {
    setVisible(true);
  };

  function handleOk(data) {
    setPrevWork(data);

    // 根据rowId获取当前row的State，然后在更新
    const prework = data[0];
    if (!prework) {
      const newData = { ...rowState, prevWork: JSON.stringify([]) }
      setState(newData)
      updateRowData(original.id, newData);
      setVisible(false);
      return
    }
    const { rowId: prevWorkId, prevType, prevInterval = 0 } = prework;
    const prevWorkRow = rowsById[prevWorkId];
    const { state, values } = prevWorkRow;
    const preworkData = { ...values, ...state }
    const { startDate: preStartDate, endDate: preEndDate } = preworkData;
    let { startDate, endDate, days = 0 } = newState;

    const rowstart = moment(startDate).valueOf();
    const rowend = moment(endDate).valueOf();

    const prevend = moment(preEndDate).add(Math.ceil(prevInterval), "day").valueOf()
    const prevStart = moment(preStartDate).add(Math.ceil(prevInterval), "day").valueOf()
    let needUpdate = false
    switch (prevType) {
      case "FS":
        if ((!startDate) || prevend > rowstart) {
          startDate = moment(prevend).format("YYYY-MM-DD");
          endDate = moment(startDate).add(Math.max(Math.ceil(days) - 1, 0), "day").format("YYYY-MM-DD");
          if (prevend > rowstart) {
            needUpdate = true;
          }
        }

        break;
      case "SS":
        if ((!startDate) || prevStart > rowstart) {
          startDate = moment(prevStart).format("YYYY-MM-DD");
          endDate = moment(startDate).add(Math.max(Math.ceil(days) - 1, 0), "day").format("YYYY-MM-DD");
          if (prevStart > rowstart) {
            needUpdate = true;
          }
        }
        break;
      case "FF":
        if ((!endDate) || prevend > rowend) {
          endDate = moment(prevend).format("YYYY-MM-DD");
          startDate = moment(endDate).subtract(Math.max(Math.ceil(days) - 1, 0), "day").format("YYYY-MM-DD");
          if (prevend > rowend) {
            needUpdate = true;
          }
        }

        break;
      case "SF":
        if ((!endDate) || prevStart > rowend) {
          endDate = moment(prevStart).format("YYYY-MM-DD");
          startDate = moment(endDate).subtract(Math.max(Math.ceil(days) - 1, 0), "day").format("YYYY-MM-DD");
          if (prevStart > rowend) {
            needUpdate = true;
          }
        }
        break;

      default:
        break;
    }
    if (needUpdate) {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: <div>因前置任务，开始时间需平移至{startDate}</div>,
        onOk() {
          const newData = { ...rowState, startDate, endDate, prevWork: JSON.stringify(data) }
          setState(newData)
          updateRowData(original.id, newData);
          setVisible(false);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      return
    }
    const newData = { ...rowState, startDate, endDate, prevWork: JSON.stringify(data) }
    setState(newData)
    updateRowData(original.id, newData);
    setVisible(false);
  };

  function handleCancel(e) {
    setVisible(false);
  };
  // console.log(preWorkName);
  const name = preworks.map(item => `${item.preWorkName}(${item.prevType}+${item.prevInterval})`).join(",");
  return (
    <>
      <Input readOnly onClick={() => showModal()} value={name} />
      <Layer
        type="drawer"
        title="前置任务"
        width="30vw"
        visible={visible}
        onClose={handleCancel}
        
        destroyOnClose={false}
      >
        <Edit onClose={handleCancel} onSubmit={handleOk} value={preworks} list={list} rowId={id} workId={newState.id} />
      </Layer>
    </>
  )
}

export default PrevWork;

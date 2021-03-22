
import React from 'react'
import { Input, InputNumber } from 'antd'
import moment from "moment"
import { JgDatePicker } from '@/components/CustomForm';
// Create an editable cell renderer
const EditableCell = (props) => {
  // console.log(props);
  const {
    // value: initialValue,
    row,
    column: { id, type },
    updateRowData,
    rowsById
  } = props
  const { original, setState, state, id: RowId } = row
  // console.log(state);
  const newState = { ...original, ...state };
  const isParentPlan = original.children.length > 0;
  function onChange(newvalue) {
    let { endDate } = newState;
    if (id === "days") {
      const { startDate } = newState;
      if (startDate) {
        endDate = moment(startDate).add(Math.max(Math.ceil(newvalue) - 1, 0), 'd').format("YYYY-MM-DD");
      }
    }
    if (id === "startDate") {
      const { days } = newState;
      if (days && newvalue) {
        endDate = moment(newvalue).add(Math.max(Math.ceil(days) - 1, 0), 'd').format("YYYY-MM-DD");
      }
    }
    const newData = { ...state, endDate, [id]: newvalue }
    setState(newData);

  }

  const onBlur = () => {
    updateRowData(original.id, newState);
    // 如果有父级,则更新父级数据
    if (original.parentId) {
      const parentRowId = RowId.split(".")[0];
      const { setState: setParentState, state: parentState, subRows } = rowsById[parentRowId];

      let { startDate, days, endDate } = parentState;
      const initSubstate = subRows.map(({ state, original }) => {
        const newSubState = { ...original, ...state }
        return newSubState
      })
      const dates = initSubstate.filter(({ startDate }) => !!startDate)
      if (dates.length > 0) {
        const minStartDates = Math.min(...dates.map(({ startDate }) => {
          return moment(startDate).valueOf()
        }));

        const maxEndDates = Math.max(...(dates.map(({ startDate, days }) => {
          return moment(startDate).add(Math.max(Math.ceil(days) - 1, 0), 'd').valueOf()
        })));

        const sDate = moment(minStartDates);
        const eDate = moment(maxEndDates);
        startDate = sDate.format("YYYY-MM-DD");
        endDate = eDate.format("YYYY-MM-DD");
        days = eDate.diff(sDate, "day") + 1;

        const newParentState = { ...parentState, children: initSubstate, startDate, endDate, days }
        setParentState(newParentState)
        updateRowData(original.parentId, newParentState)
      }
    }
  }

  switch (type) {
    case "number":
      return (
        <InputNumber
          onChange={onChange}
          value={newState[id]}
          readOnly={isParentPlan}
          onBlur={onBlur}
          min={0}
        />)
    case "date":
      if (isParentPlan) {
        return <>{newState[id]}</>
      }
      return <JgDatePicker onChange={onChange} value={newState[id]} onBlur={onBlur} />
    default:
      return <Input value={newState[id]} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
  }
}

export default EditableCell
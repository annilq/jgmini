import React, { useState, useMemo } from 'react';
import moment from "moment"
import { Select, Modal } from 'antd';
import ReactGantt from "@/components/Gantt"
import { TreePicker } from "@/components/CustomForm"
import GanttList from "./GanttList"

const { Option } = Select;

function Gantt(props) {
  const { data } = props;

  const [viewMode, setViewMode] = useState("Day");
  const [expandedKeys, setExpandedKey] = useState([]);

  function getTasks(tasks) {
    if (tasks.length === 0) {
      return []
    }
    const tasksdata = tasks.reduce((total, task) => {
      const { id, workName, workload, unit, finishWorkload, actualEndDate, actualStartDate, finishRate, startDate, endDate, children = [] } = task
      const dependencies = children.map(subTask => subTask.id);
      total.push({
        id,
        unit,
        start: startDate,
        end: endDate,
        actualStart: actualStartDate && moment(actualStartDate).startOf('day').format("YYYY-MM-DD"),
        actualEnd: moment(actualEndDate || new Date).endOf('day').add(1, "day").format("YYYY-MM-DD"),
        name: workName,
        workload,
        finishWorkload,
        progress: finishRate * 100 || 0,
        ...expandedKeys.indexOf(id) > -1 && { dependencies }
      });
      if (expandedKeys.indexOf(id) > -1) {
        const subTask = getTasks(children);
        if (subTask.length > 0) {
          return total.concat(subTask)
        }
      }
      return total
    }, []);
    return tasksdata
  };


  const tasksdata = useMemo(() => getTasks(data), [data, expandedKeys]);
  if (tasksdata.length === 0) {
    return false
  }

  function showTask(task) {
    const { name, finishWorkload, workload, end, progress, unit } = task
    const endDate = moment(end).format('YYYY-MM-DD');
    Modal.info({
      title: "任务详情",
      maskClosable: true,
      okText: '确定',
      content: (
        <div className="details-container">
          <div>任务名称:{name}</div>
          <div>计划完成日期 :{endDate}</div>
          <div>计划工作量 :{workload || 0}
            <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              readOnly
              placeholder="单位"
              value={unit}
              store={window.g_app._store}
            />
          </div>
          <div>已完成工作量 :{finishWorkload || 0}
            <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              readOnly
              placeholder="单位"
              value={unit}
              store={window.g_app._store}
            />
          </div>
          <div>工作进度 :{Number(progress).toFixed(0) || 0}%</div>
        </div>
      ),
    })
  }

  return (
    <div>
      <div style={{ display: "flex", lineHeight: "34px", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          计划工期
          <div
            style={{
              marginLeft: "10px",
              width: "30px",
              height: "8px",
              backgroundColor: "#bdc7d2"
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
          实际工期
          <div
            style={{
              marginLeft: "10px",
              width: "30px",
              height: "8px",
              backgroundColor: "#8bacff"
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
          延期
          <div
            style={{
              marginLeft: "10px",
              width: "30px",
              height: "8px",
              backgroundColor: "#ffa534"
            }}
          />
        </div>
        {/* <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
          展示维度
          <Select value={viewMode} style={{ width: 120, marginLeft: 10 }} onChange={(value) => { setViewMode(value) }}>
            <Option value="Day">日</Option>
            <Option value="Week">周</Option>
            <Option value="Month">月</Option>
          </Select>
        </div> */}
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <div style={{ flex: "1" }}>
          <GanttList list={data} onExpandedChange={setExpandedKey} expandedKey={expandedKeys} />
        </div>
        <div style={{ flex: "2", overflow: "scroll", minWidth: 200 }}>
          <ReactGantt
            tasks={tasksdata}
            viewMode={viewMode}
            onClick={showTask}
          />
        </div>
      </div>
    </div>
  );

}
export default Gantt
import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, notification } from 'antd';
import router from 'umi/router';

import ProgressRing from '@/components/ProgressRing';
import SearchForm from '@/components/SearchForm';
import { JgRangePicker, FilePreview } from '@/components/CustomForm';
import useOrientationChange from '@/hooks/useOrientationChange';

import styles from "@/common/styles/projectplan.less"
import commonStyles from "@/components/CustomForm/index.less"
import GanttChart from './GanttChart';
import PlanList from "./list"

function Main(props) {
  const { match: { params: { id }, }, data, dispatch, list } = props;
  const { finishRate, recordStatus, leaderName, projectName, projectId, contractStartDate, contractEndDate, planStartDate, planEndDate, lastReportTime, remark, attachId } = data

  const [mode, setMode] = useState(0);
  const searchArr = [
    {
      name: 'dateparams',
      // label: "时间范围",
      component: <JgRangePicker extraProps={{ avoidInit: true }} className={commonStyles.searchInput} />,
    }
  ];

  function switchMode(e) {
    setMode(e.target.value)
  }

  function editItem(record) {
    router.push(`/projectProcess/processPlan/edit/${record.id}`);
    NativeUtil.pushWebHistory(router.goBack);
  }

  function goEditPlans() {
    // dispatch({ type: 'projectProcess/toggleEdit', payload: false });
    router.push(`/projectProcess/processPlanDetails/edit/${id}`);
    NativeUtil.pushWebHistory(router.goBack);
  }

  function goReport() {
    dispatch({ type: 'projectProcess/toggleEdit', payload: false });
    router.push(`/projectProcess/processReport/edit?projectId=${projectId}`);
    NativeUtil.pushWebHistory(router.goBack);
  }

  function getList(params = {}) {
    dispatch({ type: 'projectPlan/listRemote', payload: { id, ...params } });
  }
  function queryRemote() {
    dispatch({ type: 'projectProcess/queryRemote', payload: { id } });
  }

  // 发布表单
  function publishFormData() {
    dispatch({
      type: 'projectProcess/publishRemote',
      payload: { ...data, id },
      callback(response) {
        if (response.code === 0) {
          notification.success({ message: '操作成功' });
          queryRemote()
        }
      },
    });
  }
  function search(params) {
    const { dateparams = [] } = params;
    const [planStartDate, planEndDate] = dateparams;
    getList({ planStartDate, planEndDate })
  }

  useEffect(() => {
    if (id) {
      getList();
      queryRemote();
    }
  }, [id]);

  const [isLandscape, setLandscape] = useOrientationChange();
  // const style = useMemo(() => {
  //   const { clientWidth, clientHeight } = document.documentElement;
  //   if (isLandscape) {
  //     return {
  //       width: clientHeight,
  //       height: clientWidth,
  //       overflow: "scroll",
  //       transform: "rotate(90deg)",
  //       transformOrigin: `${clientWidth / 2}px ${clientWidth / 2}px `
  //     }
  //   }
  //   return false
  // }, [isLandscape]);
  return (
    <>
      <div className={styles.planInfo} style={{ display: isLandscape ? "none" : "block" }}>
        <div style={{
          display: "flex",
          flexDirection: "row"
        }}
        >
          <div className={styles.progress}>
            <ProgressRing value={finishRate || 0} status={recordStatus} />
          </div>
          <div className={styles.title} style={{ marginLeft: 10 }}>
            {projectName}
          </div>
        </div>
        <div className={styles.content} style={{ marginLeft: 0 }}>
          <div className={styles.contentItem}>
            <div className={styles.contentLabel}> 负责人:</div>{leaderName}
          </div>
          <div className={styles.contentItem}>
            <div className={styles.contentLabel}> 合同日期:</div>{contractStartDate}至{contractEndDate}
          </div>
          <div className={styles.contentItem}>
            <div className={styles.contentLabel}> 计划日期:</div> {planStartDate}至{planEndDate}
          </div>
          {lastReportTime && <div className={styles.contentItem}><div className={styles.contentLabel}> 最新进度填报时间:</div>{lastReportTime}</div>}
          {remark && (
            <>
              <div>
                <div className={styles.contentLabel}> 计划说明:</div>
              </div>
              <div>
                {remark || "无"}
              </div>
            </>)}
          {(attachId && (
            <>
              <div className={styles.contentLabel}> 附件:</div>
              <div>
                <FilePreview value={attachId} />
              </div>
            </>
          ))}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
          >
            {recordStatus === "publish" && (
              <Button
                type="primary"
                style={{ flex: 1, height: "40px" }}
                onClick={goReport}
              >进度填报
              </Button>
            )}
            <Button
              type="primary"
              ghost
              style={{ marginLeft: 10, flex: 1, height: "40px" }}
              onClick={() => editItem(data)}
            >编辑信息
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.planInfo} style={{ marginTop: isLandscape ? 0 : 10 }}>
        <div style={{ textAlign: "center" }}>
          <Radio.Group defaultValue={0} buttonStyle="solid" value={mode} onChange={switchMode}>
            <Radio.Button value={0}>横道图</Radio.Button>
            <Radio.Button value={1}>列表式</Radio.Button>
          </Radio.Group>
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ flex: 1, marginRight: 15, alignItems: "center" }}>
            <SearchForm
              searchArr={searchArr}
              submit={search}
              reset={getList}
              getContainer={false}
              md={6}
            />
          </div>
          <a onClick={() => setLandscape(!isLandscape)}>{isLandscape ? "竖向视图" : "横向视图"} </a>
        </div>
        {mode === 1 && (
          <div style={{ marginTop: 10 }}>
            <PlanList id={id} list={list} />
          </div>
        )
        }
        {mode === 0 && (<GanttChart data={list} id={id} />)}
        {/* <Button type="primary" ghost onClick={goEditPlans} style={{ width: "100%", marginTop: 10, height: 40 }}>编辑计划详情</Button> */}
      </div>
    </>
  );
}

export default connect(({ projectPlan, projectProcess }) => ({
  list: projectPlan.list,
  data: projectProcess.item
}))(Main);

import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Switch, notification } from 'antd';
import { connect } from 'react-redux';

import { SectionHeader2 } from '@/components/SectionHeader';

import { getConfigFromCode, ReportCode } from "../utils"
import styles from "./index.less"


interface FlowItemProps {
  reportName: string;
  reportCode: ReportCode;
  id: string;
  openFlag: "Y" | "N";
}

interface FlowProps {
  data: FlowItemProps;
  editMode: boolean;
}

interface Iprops {
  editMode: boolean;
  data: { name: string, code: string, children: FlowItemProps[] };
}

function ListItem(props: Iprops) {
  const { data: { name, children }, editMode } = props
  return (
    <div
      className={styles.groupItem}
    >
      <SectionHeader2 title={name} />
      <div
        className={styles.groupContent}
      >
        {children.map(flow => <WrapFlowItem key={flow.id} data={flow} editMode={editMode} />)}
      </div>
    </div>
  );
}

function FlowItem({ data, editMode, dispatch }: FlowProps) {
  const { reportName, reportCode, openFlag, id } = data;
  const [openState, setOpenState] = useState(openFlag);
  const config = getConfigFromCode(reportCode);
  const checked = openState === "Y"

  useEffect(() => {
    // 只有编辑模式才设置默认的状态
    setOpenState(openFlag)
  }, [openFlag, editMode])

  const onChange = (checked) => {
    const newOpenFlag = checked ? "Y" : "N"
    dispatch({
      type: 'statistic/update',
      payload: {
        id,
        openFlag: newOpenFlag
      },
      callback(data) {
        // 成功之后改变state
        setOpenState(newOpenFlag)
      }
    });
  }

  if (!config) {
    return <div>{reportName}报表未配置</div>
  }

  const imgUrl = require("../images/" + config.icon + ".png")

  const goDetail = () => {
    if (editMode) {
      return
    }
    if (config.service) {
      router.push(`/report/${reportCode}`);
    } else {
      notification.info({ message: "该模块尚未完成开发" });
    }
  }

  return (
    <div
      className={styles.flowItem}
      onClick={goDetail}
    >
      <img src={imgUrl} alt="" />
      <p style={{ marginTop: 5 }}>{reportName}</p>
      {editMode && <Switch checked={checked} onChange={onChange} />}
    </div>
  );
}

const WrapFlowItem = connect()(FlowItem)
export default ListItem;


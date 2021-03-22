import React from 'react';
import { RightOutlined } from '@ant-design/icons';

import Layer from '@/components/Layer';
import Detail from '@/components/CustomForm/detail/detail';

import styles from '@/components/CustomForm/index.less';
import useFormConfig from '@/hooks/useFormConfig';
import useLayerVisible from '@/hooks/useLayer';

import Task from './detail';
import TaskExtra from './TaskExtra';

import TaskProgress from './TaskProgress';

function DetailPage(props) {
  const { item, formCode } = props;
  const { sysVersionId, versionId } = item;
  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId });
  const [visible, setVisible] = useLayerVisible(false);

  if (!config) {
    return false;
  }

  return (
    <>
      <Detail formdata={item} containers={config.containers} formCode={formCode}>
        {/* 子任务不能再有子任务 */}
        <TaskExtra formdata={item} />
        {!item.parentId && <Task taskId={item.id} />}
      </Detail>
      {config.formName && (
        <div className={styles.linklist}>
          <div
            className={styles.linkitem}
            onClick={() => {
              setVisible(true);
            }}
          >
            <div>任务进度</div> <RightOutlined style={{ color: "#999" }} />
          </div>
        </div>)}
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        <TaskProgress taskId={item.id} />
      </Layer>
    </>
  );
}

export default DetailPage;

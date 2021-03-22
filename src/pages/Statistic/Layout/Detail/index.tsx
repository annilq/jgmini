import React from 'react';

import Projectinfo from "@/pages/Statistic/Layout/Detail/projectinfo"
import styles from "@/components/CustomForm/index.less"

function Detail(props) {
  const { projectId, children } = props
  return (
    <div
      style={{ padding: "16px 24px 0" }}
    >
      <div className={styles.baseForm}>
        <div
          style={{
            padding: 0,
            width: "100%"
          }}
          className={styles.formDetailContainer}
        >
          {projectId && <Projectinfo id={projectId} />}
          {children}
        </div>
      </div>
    </div>);
}

export default Detail;

import React from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import DashboardHeader from '@/components/DashboardHeader';
import { SectionHeader2 } from '@/components/SectionHeader';
import { DataSelecter, FilePreview } from '@/components/CustomForm';

import styles from './ProjectCard.less';

function Main({ project, loading }) {
  return (
    <Skeleton spinning={loading}>
      <div style={{ marginTop: '16px' }}>
        <DashboardHeader title="项目信息" />
        <div className={styles.project}>
          <div className={styles.projectSummary}>
            <SectionHeader2 title="基础信息" />
            <div className={styles.content}>
              <div style={{ fontWeight: 'bold', color: '#000', marginTop: '50px' }}>
                {project.name}
              </div>
              <div style={{ color: '#2df328', marginTop: '20px' }}>{project.no}</div>

              <DataSelecter
                extraProps={{
                  flag: 'projectStatusMap',
                  type: 2,
                }}
                store={window.g_app._store}
              >
                {candidates => {
                  // project.status=2
                  // value可能不是数值类型，不需要强制对等
                  const obj = candidates.find(item => item.value === project.status);
                  return (
                    obj && (
                      <div className={styles.status} data-status={project.status}>
                        <span style={{ color: '#fff' }}>{obj.label} </span>
                      </div>
                    )
                  );
                }}
              </DataSelecter>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div>项目简称</div>
                  <div>{project.abbreviation}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>项目类型</div>
                  <div>{project.cateName}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>负责人</div>
                  <div>{project.leaderName}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>项目性质</div>
                  <div>
                    <DataSelecter extraProps={{ flag: 'projectStatusMap', type: 2 }} store={window.g_app._store}>
                      {candidates => {
                        const candidate = candidates.find(item => item.value === project.nature);
                        return candidate && candidate.label;
                      }}
                    </DataSelecter>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div>创建人</div>
                  <div>{project.creatorName}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>创建时间</div>
                  <div>{project.createTime}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.projectDetail}>
            <SectionHeader2 title="详细信息" />
            <div className={styles.content}>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div>备案号</div>
                  <div>{project.recordNo}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>施工许可证</div>
                  <div>{project.buildPermitNo}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>竣工日期</div>
                  <div>{project.endDate}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>项目造价(万元)</div>
                  <div>{project.cost}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>项目长度(m)</div>
                  <div>{project.length}</div>
                </div>
                <div className={styles.infoItem}>
                  <div>施工单位</div>
                  <div>{project.builder}</div>
                </div>
                <div className={styles.infoItem} style={{ width: '100%', lineHeight: '24px' }}>
                  <div>地址</div>
                  <div>{project.address}</div>
                </div>
                <div className={styles.infoItem} style={{ width: '100%', lineHeight: '24px' }}>
                  <div>备注</div>
                  <div>{project.builder}</div>
                </div>
                <div className={styles.infoItem} style={{ width: '100%' }}>
                  <div>附件</div>
                  <div>
                    <FilePreview value={project.attach} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
export default connect(({ project, loading }) => ({
  project: project.project,
  loading: loading.effects['project/queryRemote'] || false,
}))(Main);

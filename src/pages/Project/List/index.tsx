import React from 'react';
import { Link } from 'react-router-dom';

import ProjectModal from './modal';

// 1-通过
// 2-口头警告
// 3-书面整改（未发）
// 4-书面整改（已发）
const actionColumns = [
  {
    title: '设置项目可看人员',
    width: 150,
    dataIndex: 'canSeeUserName',
    render: (text, data) => data.canConfigure ? <ProjectModal formdata={data} key={text} /> : text || '-'
  },
  {
    title: '项目视图',
    width: 150,
    dataIndex: 'canSeeUserName',
    render: (_, record) => {
      // 这里要区别对待一下
      // 如果是项目列表，就根据no字段跳转到项目视图
      if (
        record.approveStatus === 'COMPLETE'
      ) {
        return (
          <Link to={`/project/dashboard?appCode=07&projectId=${record.id}`} target="_blank">
            查看
          </Link>
        );
      }
      return false
    },
  },
];

export default actionColumns;

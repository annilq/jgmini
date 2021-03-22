import React, {PureComponent, Fragment} from 'react';
import { Modal, Tag, Icon} from 'antd';
import PropTypes from 'prop-types';
import styles from "./index.less";


/**
 *  公共Tag
 *
 */
class TaskTag extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };



  render() {
    const {data = [], remove, edit} = this.props;

    return (
      <Fragment>
        <Tag
          closable
          onClose={ e => {
            e.preventDefault();
            e.stopPropagation();
            Modal.confirm({
              title: '操作提醒',
              content: '确认删除?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                remove(data);
              },
            });
          }}
          onClick={(e)=> {
            e.preventDefault();
            edit(data)
          }}
          style={{ background: `${data.color}`, borderRadius:'12px 12px 12px 12px',border:0,color:'#ffffff',fontSize:'10px',textAlign:'center',padding:'1px 8px 1px 15px' }}>
          <span className={styles.name}>{data.name}</span>
        </Tag>
      </Fragment>
    );
  }
}

export default TaskTag;

import React from 'react';
import { Drawer, Modal } from 'antd';
import PropTypes from 'prop-types';
import Loading from '@/components/Loading';
import { modalStyle } from '@/common/styles/layer';

/**
 * 公用弹出层组件
 * @author hmy
 *
 * @param  {string}   type          图层类型, 必须
 * @param  {node}   title         头部标题，必须
 * @param  {boolean}  visible       是否显示Layer，必须
 * @param  {function} onClose       关闭时的回调
 * @param  {boolean}  loading       是否显示Loading
 * @param  {string}   loadingText   Loading提示字符
 * @param  {node}     children      drawer内部的节点
 * @param  {any}      rest          其余参数
 *
 */
function Layer({ type, title, visible, onClose, loading, loadingText, children, ...rest }) {
  return type === 'modal' ? (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={modalStyle}
      destroyOnClose
      {...rest}
    >
      <Loading loading={loading} loadingText={loadingText}>
        {children}
      </Loading>
    </Modal>
  ) : (
    <Drawer
      title={title}
      visible={visible}
      onClose={onClose}
      className="drawer"
      destroyOnClose
      {...rest}
    >
      <Loading loading={loading} loadingText={loadingText}>
        {children}
      </Loading>
    </Drawer>
  );
}

Layer.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default React.memo(Layer);

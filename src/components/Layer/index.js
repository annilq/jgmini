// import React from 'react';
// import { Popup } from "annar"
// import PropTypes from 'prop-types';

// /**
//  * 公用弹出层组件
//  * @author hmy
//  *
//  * @param  {string}   type          图层类型, 必须
//  * @param  {node}   title         头部标题，必须
//  * @param  {boolean}  visible       是否显示Layer，必须
//  * @param  {function} onClose       关闭时的回调
//  * @param  {boolean}  loading       是否显示Loading
//  * @param  {string}   loadingText   Loading提示字符
//  * @param  {node}     children      drawer内部的节点
//  * @param  {any}      rest          其余参数
//  *
//  */
// function Layer({ title, visible, onClose, children, ...rest }) {
//   return (
//     <Popup
//       title={title}
//       position="right"
//       open={visible}
//       onClose={onClose}
//       style={{ width: "90%", height: "100%", borderRadius: "0px" }}
//       {...rest}
//     >
//       {children}
//     </Popup>
//   );
// }
// export default Layer;
import React from 'react';
import { createHostComponent } from 'remax/macro';

const PageContainer = createHostComponent('page-container', [['show', 'visible'], ['bindafterleave', 'onClose'], 'position', 'children', ['custom-style', 'style'], ['overlay-style', 'overlaystyle']]);

function Layer(props) {
  const { visible, onClose, children } = props
  return (
    <PageContainer
      visible={visible}
      position="right"
      onClose={onClose}
      style="z-index:999"
      overlaystyle="z-index:999"
    >
      {children}
    </PageContainer>)
}

export default Layer
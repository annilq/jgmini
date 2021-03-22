import React from 'react';

/**
 * IconFont 组件
 * @author hmy
 *
 * @param icon
 * @param width
 * @param height
 * @returns {*}
 */
export default ({ icon, width, height }) => (
  <i className="anticon">
    <svg className="icon" aria-hidden="true" width={width} height={height}>
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  </i>
);

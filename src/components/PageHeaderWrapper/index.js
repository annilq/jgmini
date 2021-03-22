import React from 'react';
import { Button, PageHeader } from 'antd';
import classNames from 'classnames';
import GridContent from './GridContent';
import styles from './index.less';

const PageHeaderWrapper = ({
  children,
  wrapperClassName,
}) => (
  <div className={classNames(wrapperClassName, styles.main)}>
    {children ? <GridContent>{children}</GridContent> : null}
  </div>
);

export default PageHeaderWrapper;

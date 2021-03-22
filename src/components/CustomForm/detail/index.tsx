import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';

import ApproveForm from '@/components/CustomForm/edit/edit';
import Detail from '@/components/CustomForm/detail/detail';
import FlowChart from '@/components/FlowChart';
import AuditRecord from '@/components/AuditRecord';
import CommentRecord from '@/components/CommentRecord';
import RelationModule from '@/components/RelationModule';

import styles from '../index.less';

import useFormConfig from '@/hooks/useFormConfig';

interface IProps {
  // 是否显示审批
  item: any;
  formCode: string;
  aduitRender?: Function;
  [index: string]: any;
}

const initialState = {
  type: null,
  visible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'modalType':
      return { ...state, type: action.data, visible: true };
    case 'visible':
      return { ...state, visible: action.data };
    default:
      throw new Error();
  }
}

function DetailPage(props: IProps) {
  const { children, aduitRender, item, formCode, canModifyColumn, auditList } = props;
  const { sysVersionId, versionId } = item;
  const [form, setform] = useState(null);
  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId }, true);
  const [{ type, visible }, reactDispatch] = useReducer(reducer, initialState);
  let modalCom = null;
  switch (type) {
    case 'RelationModule':
      modalCom = <RelationModule domainFormCode={formCode} domainId={item.id} />;
      break;
    case 'AuditRecord':
      modalCom = <AuditRecord instanceId={item.approveInstanceId} title="审批记录" key="log" />;
      break;
    case 'FlowChart':
      modalCom = <FlowChart instanceId={item.approveInstanceId} title="审批流程" key="flow" />;
      break;
    case 'CommentRecord':
      modalCom = <CommentRecord entity={item} formCode={formCode} title="评论" key="comment" />;
      break;

    default:
      break;
  }
  return (
    <div>
      <div className={styles.baseForm}>
        {/* 审批和查看详情用不同的模板 */}
        {!aduitRender ? (
          <Detail formdata={item} containers={config.containers} formCode={formCode}>
            {children}
          </Detail>
        ) : (
          <>
            <ApproveForm
              formdata={item}
              containers={config.containers}
              showPrompt={false}
              approve={true}
              canModifyColumn={canModifyColumn}
              wrappedComponentRef={csForm => {
                setform(csForm);
              }}
            />
            {/* 是否显示审批界面 */}
            {aduitRender && aduitRender(form)}
          </>
        )}
        <div className={styles.linklist}>
          <div
            className={styles.linkitem}
            onClick={() => {
              reactDispatch({ type: 'modalType', data: 'RelationModule' });
            }}
          >
            关联模块 <Icon type="right" />{' '}
          </div>
          {item.approveInstanceId && (
            <div
              className={styles.linkitem}
              onClick={() => {
                reactDispatch({ type: 'modalType', data: 'AuditRecord' });
              }}
            >
              审批记录 <Icon type="right" />{' '}
            </div>
          )}
          {item.approveInstanceId && (
            <div
              className={styles.linkitem}
              onClick={() => {
                reactDispatch({ type: 'modalType', data: 'FlowChart' });
              }}
            >
              审批流程 <Icon type="right" />{' '}
            </div>
          )}
          <div
            className={styles.linkitem}
            onClick={() => {
              reactDispatch({ type: 'modalType', data: 'CommentRecord' });
            }}
          >
            评论 <Icon type="right" />{' '}
          </div>
        </div>
      </div>
      <Layer
        type="drawer"
        title={
          <LayerHeader
            onClose={() => reactDispatch({ type: 'visible', data: false })}
            data={item}
            title={item.name}
          />
        }
        width="100%"
        loading={false}
        visible={visible}
        closable={false}
      >
        {modalCom}
      </Layer>
    </div>
  );
}

export default connect(({ workflow }) => ({
  canModifyColumn: workflow.canModifyColumn || [],
  auditList: workflow.auditList || [],
}))(DetailPage);

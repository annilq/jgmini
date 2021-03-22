import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import IconFont from '@/components/IconFont';
import useLayerVisible from '@/hooks/useLayer';

import IncentiveModal from './IncentiveModal';
import ReformModal from './ReformModal';

function IncentiveActions({ data }) {

  const [incentiveModalVisible, setIncentiveModalVisible] = useLayerVisible(false);
  const [reformModalVisible, setReformModalVisible] = useLayerVisible(false);

  const { canAddRap, canAddReform } = data;
  // const [canAddRap, canAddReform] = [true, true];
  return (
    <div className="actionBtns" style={{ boxShadow: "0 0 8px 0 #8c8c8c" }}>
      {canAddReform && (
        <Button
          style={{
            // backgroundColor: '#ffa646',
            // color: '#fff',
            border: 'none',
          }}
          onClick={() => {
            setReformModalVisible(true)
          }}
        >
          <IconFont icon="xfzg" />下发整改
        </Button>
      )}
      {canAddRap && (
        <>
          <Divider type="vertical" style={{ height: "28px", color: "#f5f5f5" }} />

          <Button
            style={{
              // backgroundColor: '#ffa646',
              // color: '#fff',
              border: 'none',
            }}
            onClick={() => {
              setIncentiveModalVisible(true)
            }}
          >
            <IconFont icon="reward" /> 奖惩
        </Button>
        </>
      )}
      {canAddRap && (
        <IncentiveModal
          visible={incentiveModalVisible}
          onClose={() => {
            setIncentiveModalVisible(false)
          }}
        />
      )}
      {/* 整改对话框 */}
      {canAddReform && (
        <ReformModal
          visible={reformModalVisible}
          onClose={() => {
            setIncentiveModalVisible(false)

          }}
        />
      )}
    </div>
  );
}

export default connect()(IncentiveActions);

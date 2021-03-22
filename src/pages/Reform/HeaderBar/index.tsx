import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import useLayerVisible from '@/hooks/useLayer';

import ReformModal from './ReformModal';

function HeaderBar({ data }) {
  const { canCheck, canFeedback } = data;
  // const [canAddRap, canAddReform] = [true, true];
  const [visible, setVisible] = useLayerVisible(false);
  const [reformType, setReformType] = useState(null);

  return (
    <div className="actionBtns">
      {canCheck && (
        <Button
          onClick={() => {
            setVisible(true)
            setReformType(1)
          }}
          type="primary"
        >
          复检
        </Button>
      )}
      {canFeedback && (
        <Button
          onClick={() => {
            setVisible(true)
            setReformType(2)
          }}
          type="primary"
        >
          申请复检
        </Button>
      )}

      <ReformModal
        type={reformType}
        visible={visible}
        onClose={() => {
          setVisible(false)
          setReformType(2)
        }}
      />
    </div>
  );
}

export default connect()(HeaderBar);

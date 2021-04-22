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
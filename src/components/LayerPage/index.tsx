import React from 'react';
import { View, Text } from 'remax/wechat';
import ReactDOM from 'react-dom';
import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';

class LayerPage {
  state = { containers: [] };
  static LayerPageMap = {};

  static destroyAll = () => {
    Object.keys(LayerPage.LayerPageMap).forEach(id => LayerPage.close(id));
  };

  static close = id => {
    ReactDOM.unmountComponentAtNode(LayerPage.LayerPageMap[id]);
    delete LayerPage.LayerPageMap[id];
  };

  showPage = content => {
    const uid = 'layer-' + Date.now();
    const containerEl = document.createElement('div');
    containerEl.id = uid;
    LayerPage.LayerPageMap[uid] = containerEl;
    document.body.appendChild(LayerPage.LayerPageMap[uid]);
    ReactDOM.render(
      <Layer
        type="drawer"
        title={<LayerHeader onClose={() => LayerPage.close(uid)} />}
        width="100%"
        visible={true}
        onClose={() => LayerPage.close(uid)}
        loading={false}
        closable={false}
      >
        {content}
      </Layer>,
      LayerPage.LayerPageMap[uid]
    );
    return () => LayerPage.close(uid);
  };
}

export default new LayerPage();

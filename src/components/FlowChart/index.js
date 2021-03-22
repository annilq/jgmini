import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tag } from 'antd';
import G6 from '@/components/FlowChart/g6';
import dagre from '@/utils/dagre';
import {formatFlow} from '@/utils/utils.js';
import styles from './index.less';

@connect(({ workflow }) => ({
  workflow,
}))
class FlowPage extends React.Component {
  constructor(props) {
    super(props);
    this.graph = null;
    this.g = null;
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { dispatch, instanceId } = this.props;
    dispatch({
      type: 'workflow/queryWorkFlow',
      payload: { instanceId},
      callback: flowdata => {
        this.setState({ data: flowdata });
        const newData = formatFlow(flowdata.nodeList, flowdata.linkList, flowdata.tasks);
        this.drawFlow(newData);
      },
    });
  }

  drawFlow(data) {
    this.g = new dagre.graphlib.Graph({ directed: true, compound: true, multigraph: true });
    this.g.setDefaultEdgeLabel(function() {
      return {};
    });
    const rect = document.querySelector('#mountNode').getBoundingClientRect();

    this.g.setGraph({ rankdir: 'TB' });
    this.drawLayout(data);
    G6.registerNode('FINISH', {
      drawShape(cfg, group) {
        const size = cfg.size;
        const rect = group.addShape('rect', {
          attrs: {
            x: -size[0] / 2,
            y: -size[1] / 2,
            width: size[0],
            height: size[1],
            radius: 4,
            stroke: '#1890FF',
            fill: '#FFFFFF'
          }
        });
        return rect;
      }
    }, 'single-shape');
    G6.registerNode('END', {
      drawShape(cfg, group) {
        const size = cfg.size;
        const circle = group.addShape('rect', {
          attrs: {
            x: -size[0] / 2,
            y: -size[1] / 2,
            width: size[0],
            height: size[1],
            radius: 4,
            fill: 'rgba(255,255,255,0)'
          }
        });
        return circle;
      }
    }, 'single-shape');
    G6.registerNode('CURRENT', {
      drawShape(cfg, group) {
        const size = cfg.size;
        const rect = group.addShape('rect', {
          attrs: {
            x: -size[0] / 2,
            y: -size[1] / 2,
            width: size[0],
            height: size[1],
            radius: 4,
            stroke: '#235685',
            fill: '#1890FF'
          }
        });
        return rect;
      },
    }, 'single-shape');
    G6.registerNode('WARNING', {
      drawShape(cfg, group) {
        const size = cfg.size;
        const rect = group.addShape('rect', {
          attrs: {
            x: -size[0] / 2,
            y: -size[1] / 2,
            width: size[0],
            height: size[1],
            radius: 4,
            stroke: '#D48116',
            fill: '#FF9A18'
          }
        });
        return rect;
      },
    }, 'single-shape');
    G6.registerNode('UNFINISH', {
      drawShape(cfg, group) {
        const size = cfg.size;
        const rect = group.addShape('rect', {
          attrs: {
            x: -size[0] / 2,
            y: -size[1] / 2,
            width: size[0],
            height: size[1],
            radius: 4,
            stroke: '#E0E0E0',
            fill: '#E0E0E0'
          }
        });
        return rect;
      },
    }, 'single-shape');
    G6.registerEdge('mPolyline', {
      draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const shape = group.addShape('path', {
          attrs: {
            endArrow: {
              path: 'M 6,0 L -1,-6 L -1,6 Z',
              d: 6,
            },
            stroke: 'rgb(176,176,176)',
            lineWidth: 1,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y]
            ],
          }
        });
        return shape;
      },
    }, 'quadratic');
    G6.registerEdge('ePolyline', {
      draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const shape = group.addShape('path', {
          attrs: {
            endArrow: {
              path: 'M -4, 0 m -4, 0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 z',
            },
            stroke: 'rgb(176,176,176)',
            lineWidth: 1,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y]
            ],
          }
        });
        return shape;
      },
    }, 'quadratic');
    G6.registerBehavior('wheel-canvas', {
      getDefaultCfg() {
        return {
          sensitivity: 5,
        };
      },
      getEvents() {
        return {
          wheel: 'onWheel'
        };
      },
      onWheel(e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
          return;
        }

        let graph = this.graph;
        let sensitivity = this.get('sensitivity');
        if (e.wheelDelta > 0) {
          graph.translate(0, -sensitivity);
        } else {
          graph.translate(0, sensitivity);
        }
        graph.paint();
        graph.emit('wheelzoom', e);
      }
    });
    this.graph = new G6.Graph({
      container: 'mountNode',
      width: rect.width,
      height: document.body.clientHeight-170,
      pixelRatio: 2,
      fitView: true,
      minZoom: 1,
      maxZoom: 1,
      rollback: true,
      modes: {
        default: ['wheel-canvas'],
      },
    });
    this.graph.data(data);
    this.graph.render();

    this.graph.on('canvas:click', ev => {
      this.setState({ model: {} });
    });
  }

  drawLayout = data => {
    let nodes = this.g.nodes();
    if (nodes.length) {
      nodes.forEach(item => {
        this.g.removeNode(item);
      });
    }
    let edges = this.g.edges();
    if (edges.length) {
      edges.forEach(item => {
        this.g.removeEdge(item.v, item.w);
      });
    }
    data.nodes.forEach(node => {
      node.nodeType === 'START' || node.nodeType === 'END'
        ? this.g.setNode(node.id, { width: node.size[0], height: node.size[1] })
        : this.g.setNode(node.id, { width: node.size[0], height: node.size[1] });
    });
    data.edges.forEach(edge => {
      this.g.setEdge(edge.source, edge.target);
    });

    dagre.layout(this.g);
    let coord;
    data.nodes.forEach((node, i) => {
      coord = this.g.node(node.id);
      data.nodes[i].x = coord.x;
      data.nodes[i].y = coord.y;
    });
    this.g.edges().forEach((edge, i) => {
      coord = this.g.edge(edge);
      data.edges[i].startPoint = coord.points[0];
      data.edges[i].endPoint = coord.points[coord.points.length - 1];
      data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
    });
  };

  render() {
    const {data} = this.state;
    const color = ['#FFFFFF','#1890FF','#FF9A18','#E0E0E0'];
    return (
      <div id="main" style={{display:'flex',flexDirection:'column',marginTop:'12px'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:'0 10px 0 10px'}}>
          <div>{data.instanceName}</div>
          <div><span><Tag color={color[0]} className={styles.colorBlock} style={{border:'1px solid #1890FF'}}/>已处理过的环节</span>
          <span><Tag color={color[1]} className={styles.colorBlock} style={{border:'1px solid #235685'}}/>进行中的环节</span>
          <span><Tag color={color[2]} className={styles.colorBlock} style={{border:'1px solid #D48116'}}/>有异常的环节</span>
          <span><Tag color={color[3]} className={styles.colorBlock}/>未开始的环节</span></div>
        </div>

        <div id="mountNode" ref="container" />

      </div>
    );
  }
}
export default FlowPage;

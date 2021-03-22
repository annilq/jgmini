import React from 'react';
import G6 from '@/components/FlowChart/g6';
import dagre from '@/utils/dagre';
import { defineEditor } from '@/utils/utils.js';
import { query } from '@/services/workflow/processDefinition';

class FlowPage extends React.Component {
  state = { preInstanceId: '', instanceId: '' };

  constructor(props) {
    super(props);
    this.graph = null;
    this.g = null;
  }

  componentDidMount() {
    this.drawFlow({ nodes: [], edges: [] });
  }

  componentWillUnmount() {
    this.graph.destroy();
  }

  getData = () => {
    const { instanceId } = this.state;
    query({ id: instanceId }).then(({ resp: flowdata }) => {
      const newData = defineEditor(flowdata.nodeList, flowdata.linkList);
      this.changeLayout(newData);
    });
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { instanceId } = nextProps;
    const { instanceId: preInstanceId } = preState;
    if (instanceId !== preInstanceId) {
      return {
        instanceId,
        preInstanceId,
      };
    }
    return null;
  }

  changeLayout = data => {
    this.drawLayout(data);
    this.graph.clear();
    this.graph.data(data);
    this.graph.render();
  };

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

  drawFlow(data) {
    this.g = new dagre.graphlib.Graph({ directed: true, compound: true, multigraph: true });
    this.g.setDefaultEdgeLabel(function() {
      return {};
    });
    const rect = document.querySelector('#mountNode').getBoundingClientRect();
    this.g.setGraph({ rankdir: 'TB' });
    G6.registerBehavior('wheel-canvas', {
      getDefaultCfg() {
        return {
          sensitivity: 5,
        };
      },
      getEvents() {
        return {
          wheel: 'onWheel',
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
      },
    });
    G6.registerEdge(
      'mPolyline',
      {
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
              path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
            },
          });
          return shape;
        },
      },
      'quadratic'
    );
    G6.registerEdge(
      'ePolyline',
      {
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
              path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
            },
          });
          return shape;
        },
      },
      'quadratic'
    );
    this.graph = new G6.Graph({
      container: 'mountNode',
      width: rect.width,
      height: 500,
      pixelRatio: 2,
      fitView: true,
      minZoom: 1,
      maxZoom: 1,
      rollback: true,
      modes: {
        default: ['wheel-canvas'],
      },
    });
  }

  render() {
    const { instanceId, preInstanceId } = this.state;
    if (preInstanceId !== instanceId) {
      this.getData();
    }
    return <div id="mountNode" />;
  }
}
export default FlowPage;

import G6 from '@antv/g6';

G6.registerNode(
  'START',
  {
    drawShape(cfg, group) {
      const size = cfg.size;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: 'rgb(255,194,116)',
          fill: 'rgba(254,228,211,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'END',
  {
    drawShape(cfg, group) {
      const size = cfg.size;
      const circle = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          fill: 'rgba(255,255,255,0)',
        },
      });
      return circle;
    },
  },
  'single-shape'
);
G6.registerNode(
  'USERTASK',
  {
    drawShape(cfg, group) {
      const size = cfg.size;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: 'rgb(148,204,255)',
          fill: 'rgba(202,230,255,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);

G6.registerNode(
  'DECISION',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -40,
          y: -24,
          width: 80,
          height: 48,
          radius: 24,
          stroke: 'rgb(92,219,211)',
          fill: 'rgba(230,255,251,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'USERDECISION',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -40,
          y: -24,
          width: 80,
          height: 48,
          radius: 5,
          stroke: 'rgb(92,219,211)',
          fill: 'rgba(230,255,251,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerEdge(
  'mPolyline',
  {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const shape = group.addShape('path', {
        attrs: {
          endArrow: {
            path: 'M 4,0 L -2,-4 L -2,4 Z', // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            d: 4,
          },
          stroke: 'rgb(176,176,176)',
          lineWidth: 2,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, startPoint.y + 35],
            ['L', endPoint.x, startPoint.y + 35],
            ['L', endPoint.x, endPoint.y],
          ],
        },
      });
      return shape;
    },
    afterDraw(cfg, group) {
      if (cfg.sourceNode.getModel().nodeType === 'DECISION') return;
      const { startPoint, endPoint } = cfg;

      const image = group.addShape('image', {
        attrs: {
          x: startPoint.x - 10,
          y: startPoint.y + (endPoint.y - startPoint.y) / 2 - 10,
          width: 20,
          height: 20,
          img: cfg.img,
        },
      });
      return image;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      const shaps = group.get('children');
      if (!shaps) {
        return;
      }
      const shape = group.get('children')[1]; // 顺序根据 draw 时确定
      const model = item.getModel();
      const { startPoint, endPoint } = model;
      if (name === 'hovering' && shape) {
        if (value) {
          shape.animate(
            {
              x: startPoint.x - 12.5,
              y: startPoint.y + (endPoint.y - startPoint.y) / 2 - 12.5,
              width: 25,
              height: 25,
            },
            500
          );
        } else {
          shape.stopAnimate();
          shape.attr('x', startPoint.x - 10);
          shape.attr('y', startPoint.y + (endPoint.y - startPoint.y) / 2 - 10);
          shape.attr('width', 20);
          shape.attr('height', 20);
        }
      }
    },
  },
  'polyline'
);

G6.registerEdge(
  'ePolyline',
  {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      console.log(group);
      const shape = group.addShape('path', {
        attrs: {
          endArrow: {
            path: 'M -4, 0 m -4, 0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 z',
          },
          stroke: 'rgb(176,176,176)',
          lineWidth: 1,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, startPoint.y + 35],
            ['L', endPoint.x, startPoint.y + 35],
            ['L', endPoint.x, endPoint.y],
          ],
        },
      });
      return shape;
    },
    afterDraw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const image = group.addShape('image', {
        attrs: {
          x: startPoint.x - 25 / 2,
          y: startPoint.y + (endPoint.y - startPoint.y) / 2 - (25 + 2) / 2,
          width: 25,
          height: 25,
          img: cfg.img,
        },
      });
      return image;
    },
    setState(name, value, item) {
      const scale = 0.1;
      const group = item.getContainer();
      const shaps = group.get('children');
      if (!shaps) {
        return;
      }
      const shape = group.get('children')[1]; // 顺序根据 draw 时确定
      const model = item.getModel();
      const { startPoint, endPoint } = model;

      if (name === 'hovering') {
        const width = shape.attr().width;
        const height = shape.attr().height;
        if (value) {
          shape.animate(
            {
              x: startPoint.x - (width + width * scale) / 2,
              y: startPoint.y + (endPoint.y - startPoint.y) / 2 - (height + height * scale + 2) / 2,
              width: width + width * scale,
              height: height + height * scale,
            },
            200
          );
        } else {
          shape.stopAnimate();
          shape.attr('x', startPoint.x - width / (1 + scale) / 2);
          shape.attr(
            'y',
            startPoint.y + (endPoint.y - startPoint.y) / 2 - (width / (1 + scale) + 2) / 2
          );
          shape.attr('width', width / (1 + scale));
          shape.attr('height', height / (1 + scale));
        }
      }
    },
  },
  'quadratic'
);
G6.Global.nodeStateStyle.selected = {
  fill: 'rgba(24,144,255,0.6)',
};
export default G6;

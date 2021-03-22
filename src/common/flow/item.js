/**
 * Created by Administrator on 2019-5-7.
 */
import { labelStyle,edgeStyle,labelEndStyle} from './style';
import plus from '../../../public/plus.png';
export const userItem = {
  name: '新流程节点',
  label: '新流程节点',
  signType:'',
  operatorType:'',
  operatorValue:null,
  notifierType:'',
  notifierValue:null,
  isCanPass:'',
  isCanAdd:'',
  isCanReplace:'',
  canModifyColumn:null,
  nodeType:'USERTASK',
  shape:'USERTASK',
  size:[220,64],
  labelCfg:labelStyle,
}

export const edageItem = {
  shape:'mPolyline',
  img:plus,
  style:edgeStyle,
}

export const endEdageItem = {
  shape:'ePolyline',
  img:plus,
  style:edgeStyle,
}

export function defaultFlow() {
  let map = new Map();
  map = {
    nodes: [
      {
        id: '00000001',
        name: '开始',
        label: '开始',
        nodeType: 'START',
        shape: 'START',
        size: [220, 64],
        labelCfg: labelStyle,
      },
      {
        id: '00000002',
        ...userItem
      },
      {
        id: '00000003',
        name: '流程结束',
        label: '流程结束',
        nodeType: 'END',
        shape: 'END',
        size: [220,20],
        labelCfg: labelEndStyle
      }
    ],
    edges: [
      {
        source: '00000001',
        target: '00000002',
        ...edageItem
      },
      {
        source: '00000002',
        target: '00000003',
        ...endEdageItem
      },
    ]
  };
  return map;
}

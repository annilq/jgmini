import moment from 'moment';
import React from 'react';
// import nzh from 'nzh/cn';
// import { labelCurrentStyle, labelEndStyle, labelStyle } from '@/common/flow/style';
// import { edageItem, endEdageItem } from '@/common/flow/item';
import { parse, stringify } from 'qs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

// export function digitUppercase(n) {
//   return nzh.toMoney(n);
// }

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 构建树
export function buildTree(list = []) {
  let map = {},
    node,
    tree = [];
  for (let i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
  }
  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId) {
      if (!map[node.parentId].children) map[node.parentId].children = [];
      map[node.parentId].children.push(node);
    } else {
      tree.push(node);
    }
  }
  return tree;
}

//禁用某个node
export function cascaderTree(list = [], item = {}) {
  for (let i = 0; i < list.length; i += 1) {
    let node = list[i];
    if (node.children) {
      cascaderTree(node.children, item);
    }
    if (item.id === node.id) {
      node.disabled = true;
      return list;
    }
  }
}

export function findItem(id, list) {
  let item = {};
  for (let i = 0; i < list.length; i++) {
    if (id == list[i].id) {
      item = list[i];
    }
  }
  return item;
}

export function findTreeValue(id, tree) {
  var isGet = false;
  var name = null;
  function search(tree, id) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].children && tree[i].children.length > 0) {
        search(tree[i].children, id);
      }
      if (id.toString() === tree[i].id.toString() || isGet) {
        isGet || (name = tree[i].name);
        isGet = true;
        break;
      }
    }
  }
  search(tree, id);

  return name;
}

// 流程设计相关
export function invalid(value) {
  let nodes = value.nodes;
  if (!nodes) return { code: '-1', msg: '流程为空' };
  let edges = value.edges;
  if (!edges) return { code: '-1', msg: '流程为空' };
  let startNodes = [];
  let endNodes = [];
  let sourceNodes = [];
  let targetNodes = [];
  for (let i = 0; i < edges.length; i++) {
    let edgeItem = edges[i];
    sourceNodes.push(edgeItem.source);
    targetNodes.push(edgeItem.target);
  }
  sourceNodes.sort();
  targetNodes.sort();
  for (let i = 0; i < nodes.length; i++) {
    let nodeItem = nodes[i];
    if (nodeItem.label == '开始') {
      if (startNodes.length > 0) {
        return { code: '-1', msg: '流程中[开始]节点不能为多个' };
      }
      startNodes.push(nodeItem);
      if (!isExist(nodeItem.id, sourceNodes)) {
        return { code: '-1', msg: '流程中[开始]节点不能为孤立流程节点' };
      }
    } else if (nodeItem.label == '结束') {
      if (endNodes.length > 0) {
        return { code: '-1', msg: '流程中[结束]节点不能为多个' };
      }
      endNodes.push(nodeItem);
      if (!isExist(nodeItem.id, targetNodes)) {
        return { code: '-1', msg: '流程中[结束]节点不能为孤立流程节点' };
      }
    } else {
      if (!isExist(nodeItem.id, sourceNodes) && !isExist(nodeItem.id, targetNodes)) {
        return { code: '-1', msg: '流程中[' + nodeItem.label + ']节点不能为孤立流程节点' };
      } else if (!isExist(nodeItem.id, sourceNodes)) {
        return { code: '-1', msg: '流程中[' + nodeItem.label + ']节点未设置下一个流程节点' };
      } else if (!isExist(nodeItem.id, targetNodes)) {
        return { code: '-1', msg: '流程中[' + nodeItem.label + ']节点未设置上一个流程节点' };
      }
    }
  }

  for (let i = 0; i < sourceNodes.length - 1; i++) {
    if (sourceNodes[i] == sourceNodes[i + 1]) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].id == sourceNodes[i]) {
          return {
            code: '-1',
            msg: '流程中[' + nodes[j].label + ']节点不能指向多个流程节点，请删除其中一条流程路径',
          };
        }
      }
    } else {
    }
  }
  for (let i = 0; i < targetNodes.length - 1; i++) {
    if (targetNodes[i] == targetNodes[i + 1]) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].id == targetNodes[i]) {
          return {
            code: '-1',
            msg: '流程中[' + nodes[j].label + ']节点不能被多个流程节点指向，请删除其中一条流程路径',
          };
        }
      }
    }
  }
  return { code: '0', msg: '是一个流程完整' };
}
export function invalidFlow(value, info) {
  let nodes = value.nodes;
  if (!info.name) {
    return { code: '-1', msg: '流程中流程名称不能为空' };
  }
  for (let i = 0; i < nodes.length; i++) {
    let nodeItem = nodes[i];
    if (nodeItem.nodeType == 'USERTASK') {
      if (nodes[i].notifierType >= 1 && nodes[i].notifierType <= 3) {
        if (nodes[i].notifierValue == '' || nodes[i].notifierValue == null)
          return { code: '-1', msg: '流程中[' + nodeItem.label + ']节点抄送人类型值为空' };
      } else if (nodes[i].operatorType != 4 && nodes[i].operatorType != 5) {
        if (nodes[i].operatorValue == '' || nodes[i].operatorValue == null)
          return { code: '-1', msg: '流程中[' + nodeItem.label + ']节点审批人类型值为空' };
      }
    }
  }
  return { code: '0', msg: '是一个流程完整' };
}
function isExist(value, array) {
  for (let i = 0; i < array.length; i++) {
    if (value == array[i]) {
      return true;
    }
  }
  return false;
}
export function format(value, formClomuns) {
  let nodes = value.nodes;
  let edges = value.edges;
  let nodeList = [];
  let linkList = [];
  for (let i = 0; i < edges.length; i++) {
    linkList.push({
      sourceNodeCode: edges[i].source,
      targetNodeCode: edges[i].target,
    });
  }
  for (let i = 0; i < nodes.length; i++) {
    nodeList.push({
      isCanAdd: nodes[i].isCanAdd,
      isCanPass: nodes[i].isCanPass,
      isCanReplace: nodes[i].isCanReplace,
      name: nodes[i].name ? nodes[i].name : nodes[i].label,
      nodeCode: nodes[i].id,
      nodeType: nodes[i].nodeType,
      notifierType: nodes[i].notifierType,
      notifierValue: nodes[i].notifierValue,
      operatorType: nodes[i].operatorType,
      operatorValue: nodes[i].operatorValue,
      canModifyColumn: JSON.stringify(canModifyColumns(nodes[i].canModifyColumn, formClomuns)),
      signType: nodes[i].signType,
    });
  }
  return { nodes: nodeList, edges: linkList };
}
function canModifyColumns(value, list) {
  if (value) {
    const cols = value.map(item => {
      const cellObg = list.find(ite => ite.id === item);
      return cellObg.item;
    });
    return cols;
  }
  return undefined;
}

function canModifyColumnArr(value) {
  if (value) {
    try {
      const values = JSON.parse(value);
      const cols = values.map(item => {
        return item.controlId;
      });
      return cols;
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
}
function sortEdges(edges, edgesArray) {
  for (let i = 0; i < edges.length; i++) {
    if (edgesArray.length == 0) {
      edgesArray.push(edges[i].sourceNodeCode);
      edgesArray.push(edges[i].targetNodeCode);
    } else if (edgesArray[edgesArray.length - 1] === edges[i].sourceNodeCode) {
      edgesArray.push(edges[i].targetNodeCode);
    } else if (edgesArray[0] === edges[i].targetNodeCode) {
      edgesArray.unshift(edges[i].sourceNodeCode);
    }
  }
  if (edgesArray.length == edges.length + 1) {
  } else sortEdges(edges, edgesArray);
}

function getPosition(edgesArray, item) {
  for (let i = 0; i < edgesArray.length; i++) {
    if (edgesArray[i] == item.nodeCode) {
      return i;
    }
  }
  return -1;
}

export function compareFlowData(m1, m2) {
  if (
    (m1.edges && m1.edges.toString()) === (m2.edges && m2.edges.toString()) &&
    (m1.nodes && m1.nodes.toString()) === (m2.nodes && m2.nodes.toString())
  ) {
    for (let i = 0; i < m2.nodes.length; i++) {
      if (m2.nodes[i].nodeType == 'USERTASK') {
        for (let key in m2.nodes[i]) {
          if (
            (m2.nodes[i][key] && m2.nodes[i][key].toString()) !=
              (m1.nodes[i][key] && m1.nodes[i][key].toString()) &&
            key != 'x' &&
            key != 'y' &&
            key != 'labelCfg'
          ) {
            return false;
          }
        }
      }
    }
    for (let i = 0; i < m2.edges.length; i++) {
      for (let key in m2.edges[i]) {
        if (m2.edges[i][key] != m1.edges[i][key] && (key == 'source' || key == 'target')) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}

export function findName(value, list) {
  if (list) {
    for (let i = 0; i < list.length; i++) {
      if (value == list[i].id) {
        return list[i].name;
      }
    }
  }
  return '';
}

function getFlowNodeStatus(tasks, nodeId) {
  for (let i = 0; i < tasks.length; i++) {
    if (nodeId == tasks[i].nodeId) return tasks[i].status;
  }
  return '';
}

export const diffTime = time => {
  let diff;
  let now = moment();
  let m1 = moment(time);
  diff = now.diff(m1, 'day');
  if (diff < 1) {
    diff = now.diff(m1, 'hour');
    if (diff < 1) {
      diff = now.diff(m1, 'minute');
      if (diff < 1) {
        diff = now.diff(m1, 'second');
        return diff + '秒前';
      } else return diff + '分钟前';
    } else return diff + '小时前';
  } else return diff + '天前';
};

export const listCharts = list => {
  let chartsArray = [];
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let newItem = {};
    newItem = { x: item.month, y: item.num, z: i };
    chartsArray.push(newItem);
  }
  return chartsArray;
};
export const chartsPos = (list = [], value) => {
  for (let i = 0; i < list.length; i++) {
    if (value == list[i].x) {
      return list[i].z;
    }
  }
  return 0;
};

export const getApprovalStatusColor = status => {
  switch (status) {
    case 'UNDERWAY':
      return 'tagColor1';
    case 'REJECT':
      return 'tagColor2';
    case 'COMPLETE':
      return 'tagColor3';
    case 'REVOKE':
      return 'tagColor4';
    default:
      return 'tagColor5';
  }
};

export const getApprovalStatusText = status => {
  switch (status) {
    case 'UNDERWAY':
      return '审批中';
    case 'REJECT':
      return '审批驳回';
    case 'COMPLETE':
      return '审批完成';
    case 'REVOKE':
      return '撤回';
    default:
      return '未提交审批';
  }
};

export const getApprovalTypeTextColor = status => {
  switch (status) {
    case 8:
      return '#0dcbe4';
    case 0:
      return '#bebebe';
    case 1:
      return '#1890ff';
    case 2:
      return '#ff5640';
    case 4:
      return '#f6be1a';
    default:
      return '#000';
  }
};

export const getTaskStatusColor = status => {
  switch (status) {
    case 'INIT':
      return '#f6be1a';
    case 'RUNNING':
    case 'SUBMIT':
      return '#0dcbe4';
    case 'REJECT':
      return '#ff5640';
    case 'FINISH':
      return '#1890ff';
    case 'CANCEL':
    case 'STOP':
      return 'grey';
    default:
      return '#000';
  }
};

export const getAppIcon = appCode => {
  switch (appCode) {
    case 'MANAGE':
      return 'zyxm';
    case 'ORGANIZATION':
      return 'zzjg';
    case 'PERSONAL':
      return 'account';
    case 'TASK':
      return 'rwgl';
    case 'CUSTOMIZE_FlOW':
      return 'zdylc';
    default:
      return 'app';
  }
};

export const getNodesArray = (data, nodeName) => {
  let value = [];
  if (data) {
    data.map(item => {
      value.push(item[nodeName]);
    });
  }
  return value;
};

export const getDepotDetailType = data => {
  switch (data) {
    case 'PURCHASE_DEPOT_IN':
      return '采购入库';
    case 'RETURN_DEPOT':
      return '退货入库';
    case 'DEPOT_OUT':
      return '领用出库';
    case 'REFUND_DEPOT_OUT':
      return '退货出库';
    case 'DEPOT_TRANSFER_IN':
      return '调拨入库';
    case 'DEPOT_TRANSFER_OUT':
      return '调拨出库';
    case 'DEPOT_CHECK_FRMLOSS':
      return '盘点报损';
    case 'DEPOT_CHECK_OVERFLOW':
      return '盘点报溢';
    default:
      return '';
  }
};

export const getDepotDetailTransferNum = data => {
  switch (data) {
    case 'PURCHASE_DEPOT_IN':
      return '';
    case 'RETURN_DEPOT':
      return '';
    case 'DEPOT_OUT':
      return '-';
    case 'REFUND_DEPOT_OUT':
      return '-';
    case 'DEPOT_TRANSFER_IN':
      return '';
    case 'DEPOT_TRANSFER_OUT':
      return '-';
    case 'DEPOT_CHECK_FRMLOSS':
      return '-';
    case 'DEPOT_CHECK_OVERFLOW':
      return '';
    default:
      return '';
  }
};

//转驼峰
export const camelCase = str => {
  let re = /_(\w)/g;
  let value = str.toLowerCase().replace(re, function($0, $1) {
    return $1.toUpperCase();
  });
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const isProduction = () => process.env.NODE_ENV === 'production';

export const isTest = () =>true
  // window.location.href.indexOf('project-test') !== -1 ||
  // window.location.href.indexOf('localhost') !== -1;

export const getLoginUrl = () => {
  if (isTest()) {
    return 'http://uc-test.jianguanoa.com:8100/#/user/login';
  }
  return 'https://uc.jianguanoa.com/#/user/login';
};

export const getAccountUrl = () => {
  if (isTest()) {
    return 'http://uc-test.jianguanoa.com:8100/#/account';
  }
  return 'https://uc.jianguanoa.com/#/account';
};

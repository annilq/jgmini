const routeMaps = [
  {
    path: '/project/index',
    componentPath: 'Project',
    formCode: 'Project',
    icon: "ic_project_xmlb",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // contract
  {
    path: '/contract/inContract',
    formCode: 'Contract',
    icon: "ic_project_skht",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 材料采购
  {
    path: '/contract/outContract',
    formCode: 'materialContract',
    icon: "ic_project_fkht",
    componentPath: 'Contract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 租赁
  {
    path: '/contract/leaseContract',
    formCode: 'leaseContract',
    icon: "ic_project_fkht",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 分包
  {
    path: '/contract/laborContract',
    formCode: 'laborContract',
    icon: "ic_project_fkht",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 其他
  {
    path: '/contract/otherContract',
    formCode: 'otherContract',
    icon: "ic_project_fkht",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 劳务
  {
    path: '/contract/workerContract',
    formCode: 'workerContract',
    icon: "ic_project_fkht",
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 进项发票
  {
    path: "/finance/invoice",
    icon: "ic_project_fp",
  },
  {
    path: '/finance/invoice/inputInvoice',
    formCode: 'InputInvoice',
    icon: "ic_project_jxfp",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 销项发票
  {
    path: '/finance/invoice/saleInvoice',
    formCode: 'SaleInvoice',
    icon: "ic_project_xxfp",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/payment',
    formCode: 'PaymentFinance',
    icon: "ic_project_fkd",
    componentPath: 'Finance/Payment',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/receipt',
    formCode: 'ReceiptFinance',
    icon: "ic_project_skd",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/settle',
    formCode: 'Settle',
    icon: "ic_project_jsd",
    componentPath: 'Finance/Settle',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/loan',
    formCode: 'LoanBill',
    icon: "ic_project_jkd",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/reimburse',
    formCode: 'ReimburseBill',
    icon: "ic_project_bxd",
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/finance/purchaseBill',
    formCode: 'PurchasePayable',
    icon: "ic_project_cgyfd",
    params: { approveStatus: 'COMPLETE' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 农名工工资
  {
    path: '/finance/salary',
    formCode: 'SalaryFinance',
    componentPath: 'Finance/Salary',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: "/supply/purchase",
    icon: "ic_project_cg",
  },
  {
    path: '/supply/purchase/purchaseApply',
    formCode: 'PurchaseApply',
    icon: "ic_project_cg",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/supply/purchase/purchaseEnquiry',
    componentPath: 'Supply/Purchase/purchaseEnquiry',
    formCode: 'PurchaseEnquiry',
    icon: "ic_project_cgxj",
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseNeed',
    formCode: 'PurchaseNeed',
    icon: "ic_project_cgxq",
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseContract',
    formCode: 'Contract',
    icon: "ic_project_cght",
    params: { contractCate: '3' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 采购入库
  {
    path: "/supply/stock",
    icon: "ic_project_kc",
  },
  {
    path: '/supply/stock/depotIn',
    formCode: 'PurchaseDepotIn',
    icon: "ic_project_cgrk",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 归还入库
  {
    path: '/supply/stock/depotIn2',
    formCode: 'ReturnDepotIn',
    icon: "ic_project_ghrk",
    componentPath: 'Supply/Stock/returnDepotIn',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 领用出库
  {
    path: '/supply/stock/depotOut',
    formCode: 'DepotOut',
    icon: "ic_project_cgck",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 退货出库
  {
    path: '/supply/stock/depotOut2',
    formCode: 'RefundDepotOut',
    "name": "depotOut2",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存调拨
  {
    path: '/supply/stock/depotTransfer',
    formCode: 'DepotTransfer',
    icon: "ic_project_kcdb",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存盘点
  {
    path: '/supply/stock/depotCheckDetail',
    formCode: 'DepotCheck',
    icon: "ic_project_ckxq",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存详情
  {
    path: '/supply/stock/depotDetail',
    operations: ['DOWNLOAD']
  },
  // 租赁进场
  {
    path: "/supply/rent",
    icon: "ic_project_zl"
  }
  ,
  {
    path: '/supply/rent/leaseenter',
    formCode: 'LeaseIn',
    icon: "ic_project_zljc",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁退场
  {
    path: '/supply/rent/leaseleave',
    formCode: 'LeaseOut',
    icon: "ic_project_zltc",
    componentPath: 'Supply/Rent/LeaseLeave',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁盘点
  {
    path: '/supply/rent/leasecheck',
    formCode: 'LeaseInDetail',
    icon: "ic_project_zlpd",
    componentPath: 'Supply/Rent/LeaseCheck',
    operations: ['DOWNLOAD'],
    showCreator: false,
  },
  {
    path: '/database/supplier',
    formCode: 'Supplier',
    icon: "ic_project_zljch",
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/material',
    formCode: 'Material',
    icon: "ic_project_zljch",
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/machine',
    formCode: 'Machine',
    icon: "ic_project_zljch",
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/database/depot',
    formCode: 'Depot',
    icon: "ic_project_zljch",
    componentPath: 'Database/Depot',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // task 任务
  {
    path: '/taskManagement/task/pending',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'PendingList',
  },
  {
    path: '/taskManagement/task/create',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'CreateList',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/taskManagement/task/charge',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'Charge',
  },
  {
    path: '/taskManagement/task/participate',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ParticipateList',
  },
  {
    path: '/taskManagement/task/confirm',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ConfirmList',
  },
  {
    path: '/taskManagement/task/all',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'AllList',
    operations: ['DOWNLOAD'],
  },
  // worklog 工作日志
  {
    path: '/worklog/index',
    formCode: 'WorkLog',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 完全自定义组件
  {
    path: '/usercreate/:formCode',
    serviceType: 'USERCREATE',
    formCode: 'USERCREATE',
    icon: "ic_project_zljch",
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 质量检查
  {
    path: '/quality',
    icon: "ic_project_zljc",
  },
  {
    path: '/quality/qualityCheck',
    formCode: 'QualityCheck',
    icon: "ic_project_zljc",
    componentPath: 'Check',
    params: { category: 1 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/quality/checkWaiting',
    formCode: 'QualityCheck',
    componentPath: 'CheckWaiting',
    params: { category: 1, status: '0' },
  },
  // 质量整改
  {
    path: '/quality/rectification',
    formCode: 'Reform',
    icon: "ic_project_zlzg",
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
    componentPath: 'Reform',
  },
  // 奖惩
  {
    path: '/quality/incentive',
    formCode: 'Incentive',
    icon: "ic_project_zljch",
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
  },
  {
    path: '/safety',
    icon: "ic_project_aqjc",
  },
  {
    path: '/safety/safetyCheck',
    formCode: 'QualityCheck',
    icon: "ic_project_aqjc",
    componentPath: 'Check',
    params: { category: 2 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/safety/checkWaiting',
    formCode: 'QualityCheck',
    icon: "ic_project_aqjch",
    componentPath: 'CheckWaiting',
    params: { category: 2, status: '0' },
  },
  // 安全整改
  {
    path: '/safety/rectification',
    formCode: 'Reform',
    icon: "ic_project_aqzg",
    params: { category: 2 },
    componentPath: 'Reform',
    operations: ['EDIT', 'DELETE'],
  },
  // 奖惩
  {
    path: '/safety/incentive',
    formCode: 'Incentive',
    icon: "ic_project_aqjch",
    params: { category: 2 },
    operations: ['EDIT', 'DELETE'],
  },
  // 劳务班组
  {
    path: '/labor/laborteam',
    formCode: 'classGroup',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划模版
  {
    path: '/projectFund/fundModel',
    formCode: 'FundDetail',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划
  {
    path: '/projectFund/fundPlan',
    formCode: 'project_fund_plan',
    componentPath: 'ProjectFund',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/projectFund/fundReport',
    formCode: 'FundReport',
    componentPath: 'ProjectFundReport',
    operations: ['WRITE']
  },
  // 物料计划
  {
    path: '/projectMaterial/materialPlan',
    formCode: 'materialPlan',
    componentPath: 'MaterialPlan',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 物资填报
  {
    path: '/projectMaterial/materialReport',
    formCode: 'materialReport',
    operations: ['WRITE'],
    componentPath: 'MaterialReport',
  },
  // 进度填报
  {
    path: '/projectProcess/processReport',
    component: './ProcessReport',
  },
  // 进度计划
  {
    path: '/projectProcess/processPlan',
    component: './ProjectPlan',
  },
]
export function getConfigFormFormCode(formCode) {
  return routeMaps.find(item => item.formCode === formCode) || {}
}

export function getConfigFormPath(path) {
  return routeMaps.find(item => item.path === path) || {}
}

export function getIconConfigFormPath(path) {
  let url = "ic_project_zdybd"
  if (path.indexOf("usercreate") > -1) {
    url = "ic_project_zdybd"
  } else {
    const routeConfig = routeMaps.find(item => item.path === path);
    if (!routeConfig) {
      console.log(path);
    } else if (routeConfig.icon) {
      url = routeConfig.icon
    }
  }
  return url
}
